import axios from "axios";
import { v4 as uuid } from "uuid";

// current-program
import * as $ from "./program.actions";

// programs
import { removeRemotePrivateProgram } from "redux/programs/programs.operations";
import {
	addLocalSavedProgram,
	removeLocalSavedProgram,
} from "redux/programs/programs.actions";
import {
	getConvertedLocalCurrentProgram,
	convertLocalProgram,
	convertRemoteProgram,
} from "redux/programs/programs.utils";

// programs-list
import { updateProgramsList } from "redux/programs-list/programs-list.operations";

// error
import { getError } from "redux/error/error.actions";

// other
import { getTokenConfig, isIncognito } from "../utils";

// --------------------- updateCurrentProgram ----------------------

// Modify current program and POST it to db
// If customizing a public program, create new remote program
export const updateCurrentProgram = (data) => (dispatch, getState) => {
	const { isPublic } = getState().program;
	const dateModified = new Date();

	dispatch($.updateLocalCurrentProgram({ ...data, dateModified }));
	if (isPublic) dispatch(createRemoteProgram());
	else dispatch(updateRemoteCurrentProgram(dateModified));
};

// --------------------- duplicateCurrentProgram ----------------------

// Create new remote program and set it as current program
// Save old current program to saved programs array
export const duplicateCurrentProgram = () => (dispatch, getState) => {
	const currentProgram = getState().program;
	const newName = currentProgram.name + " (copy)";

	dispatch(addLocalSavedProgram(currentProgram));
	dispatch($.updateLocalCurrentProgram({ replaceProps: { name: newName } }));
	dispatch(createRemoteProgram());
	// NOTE: not updating programs-list because 'current' is already in 'all'
};

// --------------------- createRemoteProgram ----------------------

// Assign new ID to current program; POST it to db; update programs-list
export const createRemoteProgram = () => (dispatch, getState) => {
	if (isIncognito(getState)) return;
	dispatch($.creatingRemoteProgram());

	const id = uuid();
	const remoteProgram = getConvertedLocalCurrentProgram(getState);
	remoteProgram.id = id;
	const data = JSON.stringify(remoteProgram);
	const token = getTokenConfig(getState);

	axios
		.post("/api/program/create", data, token)
		.then(() => {
			dispatch($.remoteProgramCreated());
			dispatch(
				$.updateLocalCurrentProgram({ replaceProps: { id, isPublic: false } })
			);
			dispatch(updateProgramsList());
		})
		.catch((err) => {
			dispatch($.remoteProgramCreateFail());
			dispatch(getError(err, "CREATE_REMOTE_PROGRAM_ERROR"));
		});
};

// ------------------ updateRemoteCurrentProgram -------------------

// POST and replace whole program
const updateRemoteCurrentProgram = (dateModified) => (dispatch, getState) => {
	if (isIncognito(getState)) return;
	dispatch($.updatingRemoteCurrentProgram());

	const data = JSON.stringify({
		...getConvertedLocalCurrentProgram(getState),
		dateModified,
	});
	const token = getTokenConfig(getState);

	axios
		.post("api/program/update", data, token)
		.then(() => dispatch($.remoteCurrentProgramUpdated()))
		.catch((err) => {
			dispatch($.remoteCurrentProgramUpdateFail());
			dispatch(getError(err, "UPDATE_REMOTE_PROGRAM_ERROR"));
		});
};

// --------------------- syncCurrentProgram ----------------------

// Sync current program by ID matching remoteProgramsList.current,
// GET if newer than local
// TODO: POST if newer than remote
export const syncCurrentProgram = () => (dispatch, getState) => {
	if (isIncognito(getState)) return;
	dispatch($.syncingCurrentProgram());

	const { dateModified } = getState().program;
	const data = JSON.stringify({ dateModified });
	const token = getTokenConfig(getState);

	axios
		// TODO: use GET and stringify date correctly to pass as query
		.post("/api/program/sync", data, token)
		.then((res) => {
			if (res.status === 204) dispatch($.currentProgramUpToDate());
			else dispatch($.currentProgramSynced(convertRemoteProgram(res.data)));
		})
		.catch((err) => {
			dispatch($.currentProgramSyncFail());
			dispatch(getError(err, "SYNC_LOG_ERROR"));
		});
};

// --------------------- publishCurrentProgram ----------------------

// Duplicate program with given id in db and set copy as public
export const publishCurrentProgram = () => (dispatch, getState) => {
	dispatch($.publishingCurrentProgram());

	const { id } = getState().program;
	const author = getState().user.name;
	const data = JSON.stringify({ author, id });
	const token = getTokenConfig(getState);

	axios
		.post("/api/program/publish", data, token)
		.then(() => dispatch($.currentProgramPublished()))
		.catch((err) => {
			dispatch($.currentProgramPublishFail());
			dispatch(getError(err, "PUBLISH_CURRENT_PROGRAM_FAIL"));
		});
};

// --------------------- removeCurrentProgram ----------------------

// Replace currentProgram with next saved one OR reset it
export const removeCurrentProgram = () => (dispatch, getState) => {
	const { id, isPublic } = getState().program;
	const savedPrograms = getState().programs.saved;
	const wasLast = !savedPrograms.length;

	if (wasLast) {
		dispatch($.loadStandardProgram());
	} else {
		const newCurrentProgram = savedPrograms[0];
		dispatch($.loadProgram(newCurrentProgram));
		dispatch(removeLocalSavedProgram(newCurrentProgram));
	}
	// db
	if (!isPublic) dispatch(removeRemotePrivateProgram(id));
	dispatch(updateProgramsList());
};
