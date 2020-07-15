import axios from "axios";

import { programsActionTypes } from "./programs.types";
import { getError } from "../error/error.actions";
import { getTokenConfig } from "../utils";

const {
	DOWNLOADING_PROGRAMS,
	PROGRAMS_DOWNLAD_SUCCESS,
	PROGRAMS_DOWNLAD_FAIL,
	ADD_PRIVATE_PROGRAM,
	REMOVE_PRIVATE_PROGRAM,
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

export const removePrivateProgram = (data) => ({
	type: REMOVE_PRIVATE_PROGRAM,
	payload: data,
});

// ----------------------- Thunk --------------------------

export const getPrivatePrograms = (query) => (dispatch, getState) => {
	dispatch(downloadingPrograms());

	const endpoint = "/api/programs/private";
	if (query) endpoint += "?" + query;

	axios
		.get(endpoint, getTokenConfig(getState))
		.then((res) => {
			dispatch(programsDownloadSuccess({ group: "private", data: res.data }));
		})
		.catch((err) => {
			dispatch(getError(err, "SYNC_PROGRAMS_ERROR"));
			dispatch(programsDownloadFail({ group: "private" }));
		});
};

export const getPublicPrograms = (query) => (dispatch) => {
	dispatch(downloadingPrograms());

	const endpoint = "/api/programs/public";
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
