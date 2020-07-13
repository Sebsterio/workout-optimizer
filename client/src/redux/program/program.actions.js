import axios from "axios";

import programActionTypes from "./program.types";
import { convertLocalProgram, convertRemoteProgram } from "./program.utils";
import { getError } from "../error/error.actions";
import { getTokenConfig } from "../utils";

import {
	addPrivateProgram,
	removePrivateProgram,
} from "redux/programs/programs.actions";

const {
	GET_FIELDS,
	UPDATE_MAX_CUSTOM_REST,
	UPDATE_LOCAL_PROGRAM,
	CREATING_REMOTE_PROGRAM,
	UPDATING_REMOTE_PROGRAM,
	SYNCING_PROGRAM,
	REMOTE_PROGRAM_CREATED,
	REMOTE_PROGRAM_UPDATED,
	PROGRAM_UP_TO_DATE,
	PROGRAM_SYNCED,
	CLEAR_LOCAL_PROGRAM,
	PUBLISHING_PROGRAM,
	PROGRAM_PUBLISHED,
	PROGRAM_PUBLISH_FAIL,
	LOAD_PROGRAM,
} = programActionTypes;

// ----------------- Basic -----------------

export const getFields = () => ({
	type: GET_FIELDS,
});

export const updateMaxCustomRest = (data) => ({
	type: UPDATE_MAX_CUSTOM_REST,
	payload: data,
});

export const clearLocalProgram = () => ({
	type: CLEAR_LOCAL_PROGRAM,
});

export const creatingRemoteProgram = () => ({
	type: CREATING_REMOTE_PROGRAM,
});

export const remoteProgramCreated = (data) => ({
	type: REMOTE_PROGRAM_CREATED,
	payload: data,
});

export const syncingProgram = () => ({
	type: SYNCING_PROGRAM,
});

export const programUpToDate = () => ({
	type: PROGRAM_UP_TO_DATE,
});

export const programSynced = (data) => ({
	type: PROGRAM_SYNCED,
	payload: data,
});

export const updateLocalProgram = (data) => ({
	type: UPDATE_LOCAL_PROGRAM,
	payload: data,
});

export const updatingRemoteProgram = () => ({
	type: UPDATING_REMOTE_PROGRAM,
});

export const remoteProgramUpdated = () => ({
	type: REMOTE_PROGRAM_UPDATED,
});

export const publishingProgram = () => ({
	type: PUBLISHING_PROGRAM,
});

export const programPublished = () => ({
	type: PROGRAM_PUBLISHED,
});

export const programPublishFail = () => ({
	type: PROGRAM_PUBLISH_FAIL,
});

export const loadProgram = () => ({
	type: LOAD_PROGRAM,
});

// ----------------- Thunk ------------------

// POST local program to db
export const createRemoteProgram = () => (dispatch, getState) => {
	dispatch(creatingRemoteProgram());
	const remoteProgram = convertLocalProgram(getState);
	axios
		.post(
			"/api/program/create",
			JSON.stringify(remoteProgram),
			getTokenConfig(getState)
		)
		.then(() => dispatch(remoteProgramCreated()))
		.catch((err) => {
			dispatch(getError(err, "CREATE_REMOTE_PROGRAM_ERROR"));
		});
};

// GET program from db
export const syncProgram = () => (dispatch, getState) => {
	dispatch(syncingProgram());
	const dateUpdatedLocal = getState().program.dateUpdated;
	axios
		.post(
			"/api/program/sync",
			JSON.stringify({ dateUpdatedLocal }),
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

// Update local program and POST it to db
export const updateProgram = (data) => (dispatch, getState) => {
	const dateUpdated = new Date();
	dispatch(updateLocalProgram({ ...data, dateUpdated }));

	if (getState().user.isIncognito) return;

	dispatch(updatingRemoteProgram());
	const remoteProgram = convertLocalProgram(getState);

	// POST and replace whole program
	axios
		.post(
			"api/program/update",
			JSON.stringify({ ...remoteProgram, dateUpdated }),
			getTokenConfig(getState)
		)
		.then(() => dispatch(remoteProgramUpdated()))
		.catch((err) => {
			dispatch(getError(err, "UPDATE_REMOTE_PROGRAM_ERROR"));
		});
};

// DELETE program from db
export const removeRemoteProgram = (token) => (dispatch) => {
	axios
		.delete("/api/program", token)
		.then(() => dispatch(clearLocalProgram()))
		.catch((err) => dispatch(getError(err, "REMOVE_REMOTE_PROGRAM_FAIL")));
};

// Duplicate program in db and set copy as public
export const publishProgram = () => (dispatch, getState) => {
	dispatch(publishingProgram());

	const author = getState().user.name;

	axios
		.post(
			"/api/program/publish",
			JSON.stringify({ author }),
			getTokenConfig(getState)
		)
		.then(() => dispatch(programPublished()))
		.catch((err) => {
			dispatch(programPublishFail());
			dispatch(getError(err, "PUBLISH_PROGRAM_FAIL"));
		});
};

export const activateProgram = (newProgram) => (dispatch, getState) => {
	// remove newProgram from privatePrograms list
	dispatch(removePrivateProgram(newProgram));

	// Push current program to private programs array
	dispatch(addPrivateProgram(getState().program));

	// Replace current program with newProgram
	dispatch(clearLocalProgram());
	dispatch(
		updateProgram({
			mode: "replace-prop",
			newProps: {
				name: newProgram.name,
				description: newProgram.description,
				fields: JSON.parse(newProgram.fields),
			},
		})
	);

	// TODO: POST privatePprograms (replace all)
};
