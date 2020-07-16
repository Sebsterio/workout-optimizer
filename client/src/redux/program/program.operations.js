import axios from "axios";

import {
	clearLocalProgram,
	creatingRemoteProgram,
	remoteProgramCreated,
	syncingProgram,
	programUpToDate,
	programSynced,
	updateLocalProgram,
	updateLocalProgramFields,
	updatingRemoteProgram,
	remoteProgramUpdated,
	publishingProgram,
	programPublished,
	programPublishFail,
	resetLocalProgram,
} from "./program.actions";
import { getError } from "redux/error/error.actions";
import { updateLogProgramId } from "redux/log/log.operations";
import {
	addPrivateProgram,
	removeLocalPrivateProgram,
} from "redux/programs/programs.actions";

import {
	getConvertedLocalProgram,
	convertLocalProgram,
	convertRemoteProgram,
} from "./program.utils";
import { getTokenConfig } from "../utils";

// -------------------------------------------------------------------

// Modify local program and POST it to db
export const updateProgram = (data) => (dispatch, getState) => {
	const { isPublic } = getState().program;
	const dateUpdated = new Date();

	// Update local program with data
	const { mode } = data;
	if (mode) dispatch(updateLocalProgramFields({ ...data, dateUpdated }));
	else dispatch(updateLocalProgram({ ...data, dateUpdated }));

	// If customizing a public program, create new remote program
	if (isPublic) dispatch(createRemoteProgram());
	// If modifying private program, update remote program
	else dispatch(updateRemoteProgram(dateUpdated));
};

// Copy a program and activate the copy
export const duplicateProgram = () => (dispatch, getState) => {
	const currentProgram = getState().program;

	// Move current program to private programs list
	dispatch(addPrivateProgram(convertLocalProgram(currentProgram)));

	// Create new remote program and set it as current program
	const newName = currentProgram.name + " (copy)";
	dispatch(updateLocalProgram({ name: newName }));
	dispatch(createRemoteProgram());
};

// POST current program to db and save new id
export const createRemoteProgram = () => (dispatch, getState) => {
	dispatch(creatingRemoteProgram());
	axios
		.post(
			"/api/program/create",
			JSON.stringify(getConvertedLocalProgram(getState)),
			getTokenConfig(getState)
		)
		.then((res) => {
			const { _id } = res.data;
			dispatch(remoteProgramCreated());
			dispatch(updateLocalProgram({ _id, isPublic: false }));
			dispatch(updateLogProgramId(_id));
		})
		.catch((err) => {
			dispatch(getError(err, "CREATE_REMOTE_PROGRAM_ERROR"));
		});
};

// POST and replace whole program
const updateRemoteProgram = (dateUpdated) => (dispatch, getState) => {
	if (getState().user.isIncognito) return;
	dispatch(updatingRemoteProgram());
	axios
		.post(
			"api/program/update",
			JSON.stringify({ ...getConvertedLocalProgram(getState), dateUpdated }),
			getTokenConfig(getState)
		)
		.then(() => dispatch(remoteProgramUpdated()))
		.catch((err) => {
			dispatch(getError(err, "UPDATE_REMOTE_PROGRAM_ERROR"));
		});
};

// GET program from db
export const syncProgram = () => (dispatch, getState) => {
	dispatch(syncingProgram());

	// Ignore if using standard (initial) program
	const _id = getState().log.programId;
	if (!_id) return dispatch(programUpToDate());

	const dateUpdatedLocal = getState().program.dateUpdated;
	axios
		// TODO: use GET and stringify date correctly to pass as query
		.post(
			"/api/program/sync",
			JSON.stringify({ _id, dateUpdatedLocal }),
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
		// Update private programs list
		dispatch(removeLocalPrivateProgram(newProgram));
		dispatch(addPrivateProgram(getConvertedLocalProgram(getState)));

		// Update current program
		dispatch(clearLocalProgram());
		dispatch(updateLocalProgram(convertRemoteProgram(newProgram)));
		dispatch(updateLogProgramId(newProgram._id));
	} else {
		// Activate standard program
		dispatch(resetLocalProgram());
		dispatch(updateLogProgramId(null));
	}
};

// Duplicate program in db and set copy as public
export const publishProgram = () => (dispatch, getState) => {
	dispatch(publishingProgram());

	const { _id } = getState().program;
	const author = getState().user.name;
	axios
		.post(
			"/api/program/publish",
			JSON.stringify({ author, _id }),
			getTokenConfig(getState)
		)
		.then(() => dispatch(programPublished()))
		.catch((err) => {
			dispatch(programPublishFail());
			dispatch(getError(err, "PUBLISH_PROGRAM_FAIL"));
		});
};
