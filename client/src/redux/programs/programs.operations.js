import axios from "axios";
import { v4 as uuid } from "uuid";

// programs
import * as $ from "./programs.actions";
import { getSavedProgramById } from "./programs.selectors";
import { convertRemotePrograms, convertLocalProgram } from "./programs.utils";

// programs-list
import { updateProgramsList } from "redux/programs-list/programs-list.operations";

// error
import { getError } from "redux/error/error.actions";

// other
import { getConfig, getTokenConfig, isIncognito } from "../utils";

// ----------------------- syncPrograms -------------------------

// GET all programs listed in user's remote programs-list
export const syncPrograms = () => (dispatch, getState) => {
	dispatch($.downloadingPrograms({ note: "saved" }));

	const { dateModified } = getState().programs;
	const data = JSON.stringify({ dateModified });
	const token = getTokenConfig(getState);

	axios
		// TODO: use GET and stringify date correctly to pass as query
		.post("/api/programs/sync", data, token)
		.then((res) => {
			// no content (local collection up to date)
			if (res.status === 204) return dispatch($.programsUpToDate());

			const programs = convertRemotePrograms(res.data);
			dispatch($.programsDownloaded({ note: "saved" }));
			dispatch($.replaceCollection({ group: "saved", data: programs }));
		})
		.catch((err) => {
			dispatch($.programsDownloadFail({ note: "saved" }));
			dispatch(getError(err, "DOWNLOAD_PROGRAMS_ERROR"));
		});
};

// ----------------------- downloadPublicPrograms -------------------------

// GET N public programs
// Save in programs.fetched (replace all)
export const downloadPublicPrograms = (query) => (dispatch) => {
	dispatch($.downloadingPrograms({ note: "public" }));
	axios
		.get(`/api/programs/public${query ? "?" + query : ""}`)
		.then((res) => {
			const programs = convertRemotePrograms(res.data);
			dispatch($.programsDownloaded({ note: "fetched" }));
			dispatch($.replaceCollection({ group: "fetched", data: programs }));
		})
		.catch((err) => {
			dispatch(getError(err, "DOWNLOAD_PROGRAMS_ERROR"));
			dispatch($.programsDownloadFail({ note: "public" }));
		});
};

// ------------------------- saveFetchedProgram ---------------------------

// Copy program from fetched to near-front (index 1) of saved array
// If already present in saved array, remove from current index
export const saveFetchedProgram = (program) => (dispatch) => {
	dispatch($.addLocalSavedProgram(program));
	dispatch(updateProgramsList());
};

// --------------------------- activateProgram ----------------------------

// Add program to front of saved programs array
// If already present in saved array, remove from current index
export const activateProgram = (program) => (dispatch) => {
	dispatch($.setCurrentProgram(program));
	dispatch(updateProgramsList());
};

// ------------------------- removeSavedProgram ---------------------------

// Remove program data from saved programs array
// If no programs remain, load standard program
// Remove remote program if is private
export const removeSavedProgram = (program) => (dispatch, getState) => {
	const { isPublic } = program;
	const savedPrograms = getState().programs.saved;
	const wasLast = savedPrograms.length === 1;

	if (wasLast) dispatch($.setCurrentStandardProgram());
	else dispatch($.removeLocalSavedProgram(program));

	if (!isPublic) dispatch(removeRemotePrivateProgram(program));
	dispatch(updateProgramsList());
};

// --------------------- removeRemotePrivateProgram -----------------------

// DELETE program from db by programId
export const removeRemotePrivateProgram = (program) => (dispatch, getState) => {
	if (isIncognito(getState)) return;
	dispatch($.removingRemoteProgram(program));

	const { id } = program;
	const endpoint = "/api/programs/" + id;
	const token = getTokenConfig(getState);

	axios
		.delete(endpoint, token)
		.then(() => dispatch($.remoteProgramRemoved(program)))
		.catch((err) => dispatch(getError(err, "REMOVE_REMOTE_PROGRAM_FAIL")));
};

// ------------------- removeAllRemotePrivatePrograms ---------------------

// DELETE all private programs corresponding to userId
export const removeAllRemotePrivatePrograms = () => (dispatch, getState) => {
	dispatch($.removingAllRemotePrivatePrograms());
	const token = getTokenConfig(getState);
	axios
		.delete("/api/programs", token)
		.then(() => dispatch($.allRemotePrivateProgramsRemoved()))
		.catch((err) => dispatch(getError(err, "REMOVE_ALL_REMOTE_PROGRAMS_FAIL")));
};

// --------------------- duplicateProgram ----------------------

// Copy a program, assing new ID, and place it near front of the array (index 1)
export const duplicateProgram = (program) => (dispatch) => {
	const newProgram = {
		...program,
		name: program.name + " (copy)",
		id: uuid(),
		isPublic: false,
	};
	dispatch($.addLocalSavedProgram(newProgram));
	dispatch(createRemoteProgram(newProgram));
	dispatch(updateProgramsList());
};

// --------------------- modifyProgram ----------------------

// Modify current program and PUT it to db
// If customizing a public program, create new remote program
export const modifyProgram = (data) => (dispatch) => {
	const { program } = data;
	const { isPublic } = program;

	data.replaceProps = {
		...data.replaceProps,
		dateModified: new Date(),
		isPublished: false,
	};

	if (isPublic) {
		dispatch(customizeSavedPublicProgram(data));
		dispatch(updateProgramsList());
	} else {
		dispatch($.modifyLocalSavedProgram({ ...data }));
		dispatch(updateRemoteProgram(program));
	}
};

// --------------------- customizeSavedPublicProgram ----------------------

// Assign new ID to public program and POST it to db
export const customizeSavedPublicProgram = (data) => (dispatch, getState) => {
	const newId = uuid();
	data.replaceProps = {
		...data.replaceProps,
		id: newId,
		isPublic: false,
	};
	dispatch($.modifyLocalSavedProgram({ ...data }));
	dispatch($.setEditedProgram(newId));

	// Get from state in case reducer modifies it
	const customizedProgram = getSavedProgramById(getState(), newId);
	dispatch(createRemoteProgram(customizedProgram));
};

// --------------------- createRemoteProgram ----------------------

// POST currentProgram to db
export const createRemoteProgram = (program) => (dispatch, getState) => {
	if (isIncognito(getState)) return;
	dispatch($.creatingRemoteProgram(program));

	const remoteProgram = convertLocalProgram(program);
	const data = JSON.stringify(remoteProgram);
	const token = getTokenConfig(getState);

	axios
		.post("/api/program/create", data, token)
		.then(() => dispatch($.remoteProgramCreated(program)))
		.catch((err) => {
			dispatch($.remoteProgramCreateFail(program));
			dispatch(getError(err, "CREATE_REMOTE_PROGRAM_ERROR"));
		});
};

// --------------------- updateRemotePrograms ----------------------

// Update every program that's been modified
// Create program if remote doesn't exist
export const updateRemotePrograms = () => (dispatch, getState) => {
	if (isIncognito(getState)) return;

	const savedPrograms = getState().programs.saved;
	savedPrograms.forEach((program) => {
		const { isPublic, isUpdated } = program;
		if (!isPublic && !isUpdated) dispatch(updateRemoteProgram(program));
	});
};

// ------------------ updateRemoteProgram -------------------

// PUT and replace whole program
// TODO: use put verb
const updateRemoteProgram = (program) => (dispatch, getState) => {
	if (isIncognito(getState)) return;
	dispatch($.updatingRemoteProgram(program));

	const remoteProgram = convertLocalProgram(program);
	const data = JSON.stringify(remoteProgram);
	const token = getTokenConfig(getState);

	axios
		.post("api/program/update", data, token)
		.then((res) => {
			console.log(res);
			if (res.status === 404) dispatch(createRemoteProgram(program));
			else dispatch($.remoteProgramUpdated(program));
		})
		.catch((err) => {
			console.log(err);
			dispatch($.remoteProgramUpdateFail(program));
			dispatch(getError(err, "UPDATE_REMOTE_PROGRAM_ERROR"));
		});
};

// --------------------- publishProgram ----------------------

// Duplicate program with given id in db and set copy as public
export const publishProgram = (program) => (dispatch, getState) => {
	dispatch($.publishingProgram(program));

	const config = getConfig();
	const author = getState().user.name;
	const remoteProgram = convertLocalProgram(program);
	const data = JSON.stringify({ author, ...remoteProgram });

	axios
		.post("/api/program/publish", data, config)
		.then(() => dispatch($.programPublished(program)))
		.catch((err) => {
			dispatch($.programPublishFail(program));
			dispatch(getError(err, "PUBLISH_PROGRAM_FAIL"));
		});
};
