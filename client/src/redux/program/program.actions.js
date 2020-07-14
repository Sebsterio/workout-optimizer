import axios from "axios";

import programActionTypes from "./program.types";
import { getError } from "redux/error/error.actions";
import { updateLogProgramId } from "redux/log/log.actions";

import { convertLocalProgram, convertRemoteProgram } from "./program.utils";
import { getTokenConfig } from "../utils";

import {
	addPrivateProgram,
	removePrivateProgram,
} from "redux/programs/programs.actions";

const {
	GET_FIELDS,
	UPDATE_MAX_CUSTOM_REST,
	UPDATE_LOCAL_PROGRAM,
	UPDATE_LOCAL_PROGRAM_FIELDS,
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
	RESET_LOCAL_PROGRAM,
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
export const updateLocalProgramFields = (data) => ({
	type: UPDATE_LOCAL_PROGRAM_FIELDS,
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

export const resetLocalProgram = () => ({
	type: RESET_LOCAL_PROGRAM,
});

// ----------------- Thunk ------------------

// Assign id to local program and POST to db
export const createRemoteProgram = () => (dispatch, getState) => {
	dispatch(creatingRemoteProgram());

	axios
		.post(
			"/api/program/create",
			JSON.stringify(convertLocalProgram(getState)),
			getTokenConfig(getState)
		)
		.then((res) => {
			const { _id } = res.data;
			dispatch(remoteProgramCreated());
			dispatch(updateLocalProgram({ _id }));
			dispatch(updateLogProgramId(_id));
		})
		.catch((err) => {
			dispatch(getError(err, "CREATE_REMOTE_PROGRAM_ERROR"));
		});
};

// Modify local program and POST it to db
export const updateProgram = (data) => (dispatch, getState) => {
	const { isPublished } = getState().program;
	const dateUpdated = new Date();

	// Update local program with data
	const { mode } = data;
	if (mode) dispatch(updateLocalProgramFields({ ...data, dateUpdated }));
	else dispatch(updateLocalProgram({ ...data, dateUpdated }));

	// If customizing a public program, create new remote program
	if (isPublished) dispatch(createRemoteProgram());
	// If modifying private program, update remote program
	else dispatch(updateRemoteProgram(dateUpdated));
};

// POST and replace whole program (or create it if doesn't exist)
const updateRemoteProgram = (dateUpdated) => (dispatch, getState) => {
	if (getState().user.isIncognito) return;

	dispatch(updatingRemoteProgram());
	axios
		.post(
			"api/program/update",
			JSON.stringify({ ...convertLocalProgram(getState), dateUpdated }),
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

	const _id = getState().log.programId;

	// Ignore if using standard program (initial)
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

// Copy program to privatePrograms and set new program
export const activateProgram = (newProgram) => (dispatch, getState) => {
	const { _id, isPublished, name, description, dateUpdated } = newProgram;
	const fields = JSON.parse(newProgram.fields);

	dispatch(removePrivateProgram(newProgram)); // remove from private arr
	dispatch(addPrivateProgram(getState().program)); // move to private
	dispatch(updateLogProgramId(_id));
	dispatch(clearLocalProgram());
	dispatch(
		updateLocalProgram({
			_id,
			isPublished,
			name,
			description,
			dateUpdated,
			fields,
		})
	);
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

// DELETE program from db
export const removeRemoteProgram = (token) => (dispatch) => {
	axios
		.delete("/api/program", token)
		.then(() => dispatch(clearLocalProgram()))
		.catch((err) => dispatch(getError(err, "REMOVE_REMOTE_PROGRAM_FAIL")));
};
