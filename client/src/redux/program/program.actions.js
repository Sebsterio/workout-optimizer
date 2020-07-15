import axios from "axios";

import programActionTypes from "./program.types";
import { getError } from "redux/error/error.actions";
import { updateLogProgramId } from "redux/log/log.actions";
import {
	addPrivateProgram,
	removeLocalPrivateProgram,
} from "redux/programs/programs.actions";

import {
	getConvertedLocalProgram,
	convertRemoteProgram,
} from "./program.utils";
import { getTokenConfig } from "../utils";

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
