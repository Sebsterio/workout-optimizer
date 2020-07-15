import axios from "axios";

import { programsActionTypes } from "./programs.types";
import { getError } from "../error/error.actions";
import { getTokenConfig } from "../utils";
import {
	activateProgram,
	clearLocalProgram,
} from "redux/program/program.actions";

const {
	DOWNLOADING_PROGRAMS,
	PROGRAMS_DOWNLAD_SUCCESS,
	PROGRAMS_DOWNLAD_FAIL,
	ADD_PRIVATE_PROGRAM,
	UPDATE_PRIVATE_PROGRAM,
	REMOVE_LOCAL_PRIVATE_PROGRAM,
	REMOVING_REMOTE_PROGRAM,
	REMOTE_PROGRAM_REMOVED,
	CLEAR_LOCAL_PROGRAMS,
} = programsActionTypes;

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

export const addPrivateProgram = (data) => ({
	type: ADD_PRIVATE_PROGRAM,
	payload: data,
});

export const updatePrivateProgram = (id, data) => ({
	type: UPDATE_PRIVATE_PROGRAM,
	payload: { id, data },
});

export const removeLocalPrivateProgram = (data) => ({
	type: REMOVE_LOCAL_PRIVATE_PROGRAM,
	payload: data,
});

export const removingRemoteProgram = () => ({
	type: REMOVING_REMOTE_PROGRAM,
});

export const remoteProgramRemoved = () => ({
	type: REMOTE_PROGRAM_REMOVED,
});

export const clearLocalPrograms = () => ({
	type: CLEAR_LOCAL_PROGRAMS,
});

// ----------------------- Thunk --------------------------

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

	if (!program.isPublic) removeRemotePrivateProgram(_id);
};

// DELETE program from db
const removeRemotePrivateProgram = (_id) => (dispatch, getState) => {
	dispatch(removingRemoteProgram());
	axios
		.delete("/api/program/" + _id, getTokenConfig(getState))
		.then(() => dispatch(remoteProgramRemoved()))
		.catch((err) => dispatch(getError(err, "REMOVE_REMOTE_PROGRAM_FAIL")));
};

//
// TODO
//

export const duplicateProgram = () => (dispatch) => {
	console.log("--DUPLICATE (STUB)--");
};

export const removeAllPrograms = () => (dispatch) => {
	console.log("--DUPLICATE (STUB)--");
};
