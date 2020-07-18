import axios from "axios";

import { getTokenConfig } from "../utils";

import {
	downloadingPrograms,
	programsDownloaded,
	programsDownloadFail,
	removingAllRemotePrivatePrograms,
	allRemotePrivateProgramsRemoved,
	clearLocalPrograms,
	addSavedProgram,
	removeLocalSavedProgram,
	removingRemoteProgram,
	remoteProgramRemoved,
} from "./programs.actions";
import { getError } from "../error/error.actions";
import { activateProgram } from "redux/program/program.operations";
import { clearLocalCurrentProgram } from "redux/program/program.actions";
import { updateProgramsList } from "redux/programs-list/programs-list.operations";

// ----------------------- Multiple Programs -------------------------

// GET all programs listed in user's programs-list (except current program)
// Save in programs.saved (replace all)
export const downloadSavedPrograms = () => (dispatch, getState) => {
	dispatch(downloadingPrograms());
	axios
		.get("/api/programs/saved", getTokenConfig(getState))
		.then((res) => {
			dispatch(programsDownloaded({ group: "saved", data: res.data }));
		})
		.catch((err) => dispatch(programsDownloadFail()));
};

// GET N public programs
// Save in programs.fetched (replace all)
export const downloadPublicPrograms = (query) => (dispatch) => {
	dispatch(downloadingPrograms());
	axios
		.get(`/api/programs/public${query ? "?" + query : ""}`)
		.then((res) => {
			dispatch(programsDownloaded({ group: "fetched", data: res.data }));
		})
		.catch((err) => {
			dispatch(getError(err, "SYNC_PROGRAMS_ERROR"));
			dispatch(programsDownloadFail());
		});
};

// DELETE all private programs corresponding to userId
// Clear programs.saved & programs.fetched
export const removeAllPrivatePrograms = () => (dispatch, getState) => {
	dispatch(clearLocalPrograms());
	dispatch(removingAllRemotePrivatePrograms());
	axios
		.delete("/api/programs/", getTokenConfig(getState))
		.then(() => dispatch(allRemotePrivateProgramsRemoved()))
		.catch((err) => dispatch(getError(err, "REMOVE_ALL_REMOTE_PROGRAMS_FAIL")));
};

// ------------------------ Single Program -------------------------

// Add program to programs array and programs-list
export const saveFetchedProgram = (newProgram) => (dispatch) => {
	const { id } = newProgram;
	dispatch(addSavedProgram(newProgram));
	dispatch(updateProgramsList({ add: id }));
};

// Remove program from saved programs array and programs-list
export const removeSavedProgram = (program) => (dispatch, getState) => {
	const { id, isPublic } = program;

	dispatch(removeLocalSavedProgram(program));
	dispatch(updateProgramsList({ remove: id }));

	// Removing currentProgram: replace with next private one OR reset it
	if (getState().program.id === id) {
		const savedPrograms = getState().programs.saved;
		const nextProgram = savedPrograms.length ? savedPrograms[0] : null;
		dispatch(clearLocalCurrentProgram());
		dispatch(activateProgram(nextProgram));
	}

	if (!isPublic) dispatch(removeRemotePrivateProgram(id));
};

// DELETE program from db
const removeRemotePrivateProgram = (id) => (dispatch, getState) => {
	dispatch(removingRemoteProgram());
	axios
		.delete("/api/programs/" + id, getTokenConfig(getState))
		.then(() => dispatch(remoteProgramRemoved()))
		.catch((err) => dispatch(getError(err, "REMOVE_REMOTE_PROGRAM_FAIL")));
};
