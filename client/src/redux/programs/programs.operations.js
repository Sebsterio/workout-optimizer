import axios from "axios";

// programs
import * as $ from "./programs.actions";
import { getSavedProgramById, convertRemotePrograms } from "./programs.utils";

// current-program
import { loadProgram } from "redux/program/program.actions";

// programs-list
import { updateProgramsList } from "redux/programs-list/programs-list.operations";

// error
import { getError } from "../error/error.actions";

// other
import { getTokenConfig, isIncognito } from "../utils";

// ----------------------- syncPrograms -------------------------

// GET all programs listed in user's remote programs-list
export const syncPrograms = () => (dispatch, getState) => {
	dispatch($.downloadingPrograms("saved"));

	const { dateModified } = getState().program;
	const data = JSON.stringify({ dateModified });
	const token = getTokenConfig(getState);

	axios
		// TODO: use GET and stringify date correctly to pass as query
		.post("/api/programs/sync", data, token)
		.then((res) => {
			if (res.status === 204) return dispatch($.programsUpToDate());

			const programs = convertRemotePrograms(res.data);
			const currentProgram = programs.splice(0, 1)[0];

			dispatch($.programsDownloaded({ group: "saved", data: programs }));
			dispatch(loadProgram(currentProgram));
		})
		.catch((err) => {
			dispatch($.programsDownloadFail("saved"));
			dispatch(getError(err, "SYNC_PROGRAMS_ERROR"));
		});
};

// ----------------------- downloadPublicPrograms -------------------------

// GET N public programs
// Save in programs.fetched (replace all)
export const downloadPublicPrograms = (query) => (dispatch) => {
	dispatch($.downloadingPrograms("public"));
	axios
		.get(`/api/programs/public${query ? "?" + query : ""}`)
		.then((res) => {
			const programs = convertRemotePrograms(res.data);
			dispatch($.programsDownloaded({ group: "fetched", data: programs }));
		})
		.catch((err) => {
			dispatch(getError(err, "SYNC_PROGRAMS_ERROR"));
			dispatch($.programsDownloadFail("public"));
		});
};

// ------------------------- saveFetchedProgram ---------------------------

// Add program data to programs array
export const saveFetchedProgram = (program) => (dispatch) => {
	dispatch($.addLocalSavedProgram(program));
	dispatch(updateProgramsList());
};

// --------------------------- activateProgram ----------------------------

// Set newProgram as currentProgram
// Save old currentProgram in saved programs
// Remove newProgram from saved programs if is present
export const activateProgram = (program) => (dispatch, getState) => {
	const currentProgram = getState().program;
	const savedProgram = getSavedProgramById(program.id, getState);
	dispatch($.addLocalSavedProgram(currentProgram));
	dispatch(loadProgram(program));
	if (savedProgram) dispatch($.removeLocalSavedProgram(savedProgram));
	dispatch(updateProgramsList());
};

// ------------------------- removeSavedProgram ---------------------------

// Remove program data from saved programs array
// Remove remote program if is private
export const removeSavedProgram = (program) => (dispatch) => {
	const { id, isPublic } = program;
	dispatch($.removeLocalSavedProgram(program));
	if (!isPublic) dispatch(removeRemotePrivateProgram(id));
	dispatch(updateProgramsList());
};

// --------------------- removeRemotePrivateProgram -----------------------

// DELETE program from db by programId
export const removeRemotePrivateProgram = (id) => (dispatch, getState) => {
	if (isIncognito(getState)) return;
	dispatch($.removingRemoteProgram());

	const endpoint = "/api/programs/" + id;
	const token = getTokenConfig(getState);

	axios
		.delete(endpoint, token)
		.then(() => dispatch($.remoteProgramRemoved()))
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
