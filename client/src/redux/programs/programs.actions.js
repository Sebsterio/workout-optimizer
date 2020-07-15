import axios from "axios";

import { programsActionTypes } from "./programs.types";
import { getError } from "../error/error.actions";
import { getTokenConfig } from "../utils";
import {
	activateProgram,
	clearLocalProgram,
} from "redux/program/program.actions";

const {
	// multiple
	DOWNLOADING_PROGRAMS,
	PROGRAMS_DOWNLAD_SUCCESS,
	PROGRAMS_DOWNLAD_FAIL,
	REMOVING_ALL_REMOTE_PROGRAMS,
	ALL_REMOTE_PROGRAMS_REMOVED,
	CLEAR_LOCAL_PROGRAMS,
	// single
	ADD_PRIVATE_PROGRAM,
	REMOVE_LOCAL_PRIVATE_PROGRAM,
	REMOVING_REMOTE_PROGRAM,
	REMOTE_PROGRAM_REMOVED,
} = programsActionTypes;

// --- multiple programs ---

export const downloadingPrograms = () => ({
	type: DOWNLOADING_PROGRAMS,
});
export const programsDownloadSuccess = (data) => ({
	type: PROGRAMS_DOWNLAD_SUCCESS,
	payload: data,
});
export const programsDownloadFail = (data) => ({
	type: PROGRAMS_DOWNLAD_FAIL,
	payload: data,
});
export const removingAllRemotePrograms = () => ({
	type: REMOVING_ALL_REMOTE_PROGRAMS,
});

export const allRemoteProgramsRemoved = () => ({
	type: ALL_REMOTE_PROGRAMS_REMOVED,
});

export const clearLocalPrograms = () => ({
	type: CLEAR_LOCAL_PROGRAMS,
});

// --- single program local ---

export const addPrivateProgram = (data) => ({
	type: ADD_PRIVATE_PROGRAM,
	payload: data,
});

export const removeLocalPrivateProgram = (data) => ({
	type: REMOVE_LOCAL_PRIVATE_PROGRAM,
	payload: data,
});

// --- single program remote ---

export const removingRemoteProgram = () => ({
	type: REMOVING_REMOTE_PROGRAM,
});

export const remoteProgramRemoved = () => ({
	type: REMOTE_PROGRAM_REMOVED,
});

// ----------------------- Thunk --------------------------

// --------- multiple programs ---------

export const getPrivatePrograms = () => (dispatch, getState) => {
	dispatch(downloadingPrograms());

	const currentProgramId = getState().program._id;
	const endpoint = "/api/programs/private/" + currentProgramId;

	axios
		.get(endpoint, getTokenConfig(getState))
		.then((res) => {
			dispatch(programsDownloadSuccess({ group: "private", data: res.data }));
		})
		.catch((err) => dispatch(programsDownloadFail({ group: "private" })));
};

export const getPublicPrograms = (query) => (dispatch) => {
	dispatch(downloadingPrograms());

	let endpoint = "/api/programs/public";
	if (query) endpoint += "?" + query;

	axios
		.get(endpoint)
		.then((res) => {
			dispatch(programsDownloadSuccess({ group: "public", data: res.data }));
		})
		.catch((err) => {
			dispatch(getError(err, "SYNC_PROGRAMS_ERROR"));
			dispatch(programsDownloadFail({ group: "public" }));
		});
};

// DELETE all private programs corresponding to userId
export const removeAllPrograms = () => (dispatch, getState) => {
	dispatch(clearLocalPrograms());
	dispatch(removingAllRemotePrograms());
	axios
		.delete("/api/programs/", getTokenConfig(getState))
		.then(() => dispatch(allRemoteProgramsRemoved()))
		.catch((err) => dispatch(getError(err, "REMOVE_ALL_REMOTE_PROGRAMS_FAIL")));
};

// --------- single program ---------

// Remove program from privatePrograms list
export const removeProgram = (program) => (dispatch, getState) => {
	const { _id } = program;

	dispatch(removeLocalPrivateProgram(program));

	// Removing currentProgram: replace with next private one OR reset it
	if (getState().program._id === _id) {
		const privatePrograms = getState().programs.private;
		const nextProgram = privatePrograms.length ? privatePrograms[0] : null;
		dispatch(clearLocalProgram());
		dispatch(activateProgram(nextProgram, true));
	}

	if (!program.isPublic) dispatch(removeRemotePrivateProgram(_id));
};

// DELETE program from db
const removeRemotePrivateProgram = (_id) => (dispatch, getState) => {
	dispatch(removingRemoteProgram());
	axios
		.delete("/api/program/" + _id, getTokenConfig(getState))
		.then(() => dispatch(remoteProgramRemoved()))
		.catch((err) => dispatch(getError(err, "REMOVE_REMOTE_PROGRAM_FAIL")));
};
