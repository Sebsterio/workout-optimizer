import axios from "axios";

import { getTokenConfig } from "../utils";

import {
	downloadingPrograms,
	programsDownloadSuccess,
	programsDownloadFail,
	removingAllRemotePrograms,
	allRemoteProgramsRemoved,
	clearLocalPrograms,
	removeLocalSavedProgram,
	removingRemoteProgram,
	remoteProgramRemoved,
} from "./programs.actions";
import { getError } from "../error/error.actions";
import { activateProgram } from "redux/program/program.operations";
import { clearLocalCurrentProgram } from "redux/program/program.actions";
import { updateProgramsList } from "redux/programs-list/programs-list.operations";

// ----------------------- Multiple Programs -------------------------

// GET all programs listed in users programs-list db collection (except current)
export const getSavedPrograms = () => (dispatch, getState) => {
	dispatch(downloadingPrograms());
	axios
		.get("/api/programs/saved", getTokenConfig(getState))
		.then((res) => {
			dispatch(programsDownloadSuccess({ group: "saved", data: res.data }));
		})
		.catch((err) => dispatch(programsDownloadFail()));
};

// GET N public programs
export const getPublicPrograms = (query) => (dispatch) => {
	dispatch(downloadingPrograms());

	let endpoint = "/api/programs/public";
	if (query) endpoint += "?" + query;

	axios
		.get(endpoint)
		.then((res) => {
			dispatch(programsDownloadSuccess({ group: "fetched", data: res.data }));
		})
		.catch((err) => {
			dispatch(getError(err, "SYNC_PROGRAMS_ERROR"));
			dispatch(programsDownloadFail());
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

// Remove program from saved programs array and programs-list
export const removeProgram = (program) => (dispatch, getState) => {
	const { id } = program;

	dispatch(removeLocalSavedProgram(program));
	dispatch(updateProgramsList({ remove: id }));

	// Removing currentProgram: replace with next private one OR reset it
	if (getState().program.id === id) {
		const savedPrograms = getState().programs.saved;
		const nextProgram = savedPrograms.length ? savedPrograms[0] : null;
		dispatch(clearLocalCurrentProgram());
		dispatch(activateProgram(nextProgram));
	}

	if (!program.isPublic) dispatch(removeRemotePrivateProgram(id));
};

// DELETE program from db
const removeRemotePrivateProgram = (id) => (dispatch, getState) => {
	dispatch(removingRemoteProgram());
	axios
		.delete("/api/programs/" + id, getTokenConfig(getState))
		.then(() => dispatch(remoteProgramRemoved()))
		.catch((err) => dispatch(getError(err, "REMOVE_REMOTE_PROGRAM_FAIL")));
};
