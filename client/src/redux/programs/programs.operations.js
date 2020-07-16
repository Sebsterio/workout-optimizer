import axios from "axios";

import {
	downloadingPrograms,
	programsDownloadSuccess,
	programsDownloadFail,
	removingAllRemotePrograms,
	allRemoteProgramsRemoved,
	clearLocalPrograms,
	removeLocalPrivateProgram,
	removingRemoteProgram,
	remoteProgramRemoved,
} from "./programs.actions";
import { getError } from "../error/error.actions";
import { activateProgram } from "redux/program/program.operations";
import { clearLocalProgram } from "redux/program/program.actions";

import { getTokenConfig } from "../utils";

// ----------------------- Multiple Programs -------------------------

// GET all programs with userId prop of current user
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

// GET N public programs
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

// ------------------------ Single Program -------------------------

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
