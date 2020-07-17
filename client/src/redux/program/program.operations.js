import axios from "axios";
import { v4 as uuid } from "uuid";

import {
	clearLocalCurrentProgram,
	creatingRemoteProgram,
	remoteProgramCreated,
	syncingProgram,
	programUpToDate,
	programSynced,
	updateLocalCurrentProgram,
	updateLocalCurrentProgramFields,
	updatingRemoteProgram,
	remoteProgramUpdated,
	publishingCurrentProgram,
	currentProgramPublished,
	programPublishFail,
	resetLocalCurrentProgram,
} from "./program.actions";
import {
	addPrivateProgram,
	removeLocalSavedProgram,
} from "redux/programs/programs.actions";
import { updateProgramsList } from "redux/programs-list/programs-list.operations";
import { getError } from "redux/error/error.actions";

import {
	getConvertedLocalCurrentProgram,
	convertLocalProgram,
	convertRemoteProgram,
} from "./program.utils";
import { getTokenConfig } from "../utils";

// -------------------------------------------------------------------

// Modify current program and POST it to db
export const updateCurrentProgram = (data) => (dispatch, getState) => {
	const { isPublic } = getState().program;
	const dateUpdated = new Date();

	// Update local program with data
	const { mode } = data;
	if (mode) dispatch(updateLocalCurrentProgramFields({ ...data, dateUpdated }));
	else dispatch(updateLocalCurrentProgram({ ...data, dateUpdated }));

	// If customizing a public program, create new remote program
	if (isPublic) dispatch(createRemoteProgram());
	// If modifying private program, update remote program
	else dispatch(updateRemoteCurrentProgram(dateUpdated));
};

// Copy current program and activate the copy
export const duplicateCurrentProgram = () => (dispatch, getState) => {
	const currentProgram = getState().program;

	// Move current program to private programs list
	dispatch(addPrivateProgram(convertLocalProgram(currentProgram)));

	// Create new remote program and set it as current program
	const newName = currentProgram.name + " (copy)";
	dispatch(updateLocalCurrentProgram({ name: newName }));
	dispatch(createRemoteProgram());
};

// Assign new ID to current program and POST program to db
export const createRemoteProgram = () => (dispatch, getState) => {
	dispatch(creatingRemoteProgram());
	const id = uuid();
	const remoteProgram = { ...getConvertedLocalCurrentProgram(getState), id };
	axios
		.post(
			"/api/program/create",
			JSON.stringify(remoteProgram),
			getTokenConfig(getState)
		)
		.then(() => {
			dispatch(remoteProgramCreated());
			dispatch(updateLocalCurrentProgram({ id, isPublic: false }));
			dispatch(updateProgramsList({ current: id, add: id }));
		})
		.catch((err) => dispatch(getError(err, "CREATE_REMOTE_PROGRAM_ERROR")));
};

// POST and replace whole program
const updateRemoteCurrentProgram = (dateUpdated) => (dispatch, getState) => {
	if (getState().user.isIncognito) return;

	dispatch(updatingRemoteProgram());
	axios
		.post(
			"api/program/update",
			JSON.stringify({
				...getConvertedLocalCurrentProgram(getState),
				dateUpdated,
			}),
			getTokenConfig(getState)
		)
		.then(() => dispatch(remoteProgramUpdated()))
		.catch((err) => {
			dispatch(getError(err, "UPDATE_REMOTE_PROGRAM_ERROR"));
		});
};

// GET current program from db if newer than local
export const syncCurrentProgram = () => (dispatch, getState) => {
	dispatch(syncingProgram());

	// Ignore if using standard (initial) program
	const id = getState().log.programId;
	if (!id) return dispatch(programUpToDate());

	const dateUpdatedLocal = getState().program.dateUpdated;
	axios
		// TODO: use GET and stringify date correctly to pass as query
		.post(
			"/api/program/sync",
			JSON.stringify({ id, dateUpdatedLocal }),
			getTokenConfig(getState)
		)
		.then((res) => {
			if (res.status === 204) dispatch(programUpToDate());
			else {
				const localProgram = convertRemoteProgram(res.data);
				dispatch(programSynced(localProgram));
			}
		})
		.catch((err) => {
			dispatch(getError(err, "SYNC_LOG_ERROR"));
		});
};

// Replace current program and save newProgram id in log
export const activateProgram = (newProgram) => (dispatch, getState) => {
	if (newProgram) {
		// Update saved programs list
		dispatch(removeLocalSavedProgram(newProgram));
		dispatch(addPrivateProgram(getConvertedLocalCurrentProgram(getState)));

		// Update current program
		dispatch(clearLocalCurrentProgram());
		dispatch(updateLocalCurrentProgram(convertRemoteProgram(newProgram)));

		// Update reference to current program on programs-list
		dispatch(updateProgramsList({ current: newProgram.id }));
	} else {
		// Activate standard program (initial)
		dispatch(resetLocalCurrentProgram());
		dispatch(updateProgramsList({ current: null }));
	}
};

// Duplicate program in db and set copy as public
export const publishCurrentProgram = () => (dispatch, getState) => {
	dispatch(publishingCurrentProgram());

	const { id } = getState().program;
	const author = getState().user.name;
	axios
		.post(
			"/api/program/publish",
			JSON.stringify({ author, id }),
			getTokenConfig(getState)
		)
		.then(() => dispatch(currentProgramPublished()))
		.catch((err) => {
			dispatch(programPublishFail());
			dispatch(getError(err, "PUBLISH_CURRENT_PROGRAM_FAIL"));
		});
};
