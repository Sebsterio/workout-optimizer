import axios from "axios";

import { programsActionTypes } from "./programs.types";
import { getError } from "../error/error.actions";

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
export const programsDownloadFail = () => ({
	type: PROGRAMS_DOWNLAD_FAIL,
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

export const getPublicPrograms = (query) => (dispatch) => {
	dispatch(downloadingPrograms());

	axios
		.get(`/api/program/public${query ? "?" + query : ""}`)
		.then((res) => {
			dispatch(programsDownloadSuccess(res.data));
		})
		.catch((err) => {
			dispatch(getError(err, "SYNC_PROGRAMS_ERROR"));
			dispatch(programsDownloadFail());
		});
};
