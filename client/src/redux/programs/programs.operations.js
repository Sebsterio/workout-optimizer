import axios from "axios";

import { getTokenConfig } from "../utils";

// programs
import * as $ from "./programs.actions";
import {
	convertRemotePrivatePrograms,
	getConvertedLocalCurrentProgram,
	convertRemoteProgram,
} from "./programs.utils";

// current-program
import { loadProgram } from "redux/program/program.actions";

// programs-list
import { updateProgramsList } from "redux/programs-list/programs-list.operations";

// error
import { getError } from "../error/error.actions";

// ----------------------- downloadSavedPrograms -------------------------

// GET all programs listed in user's programs-list (except current program)
// Save data in programs.saved (replace all)
export const downloadSavedPrograms = () => (dispatch, getState) => {
	dispatch($.downloadingPrograms("saved"));
	const token = getTokenConfig(getState);
	axios
		.get("/api/programs/saved", token)
		.then((res) => {
			const sortedPrograms = convertRemotePrivatePrograms(res.data, getState);
			dispatch($.programsDownloaded({ group: "saved", data: sortedPrograms }));
		})
		.catch(() => dispatch($.programsDownloadFail("saved")));
};

// ----------------------- downloadPublicPrograms -------------------------

// GET N public programs
// Save in programs.fetched (replace all)
export const downloadPublicPrograms = (query) => (dispatch) => {
	dispatch($.downloadingPrograms("public"));
	axios
		.get(`/api/programs/public${query ? "?" + query : ""}`)
		.then((res) =>
			dispatch($.programsDownloaded({ group: "fetched", data: res.data }))
		)
		.catch((err) => {
			dispatch(getError(err, "SYNC_PROGRAMS_ERROR"));
			dispatch($.programsDownloadFail("public"));
		});
};

// ------------------------- saveFetchedProgram ---------------------------

// Add program data to programs array and ID to programs-list
export const saveFetchedProgram = (program) => (dispatch) => {
	const { id } = program;
	dispatch($.addLocalSavedProgram(program));
	dispatch(updateProgramsList({ add: id }));
};

// --------------------------- activateProgram ----------------------------

// Relay to correct function
export const activateProgram = (program) => (dispatch) => {
	if (program.isPublic) dispatch(activateFetchedProgram(program));
	else dispatch(activateSavedProgram(program));
};
// BUG around here !!! when activating fetched program that's saved

// ----------------------- activateFetchedProgram -------------------------

// Set newProgram as currentProgram
// Save old currentProgram in saved programs
// Update programsList
export const activateFetchedProgram = (data) => (dispatch, getState) => {
	const currentProgram = getConvertedLocalCurrentProgram(getState);
	const newProgram = convertRemoteProgram(data);
	const { id } = newProgram;
	dispatch($.addLocalSavedProgram(currentProgram));
	dispatch(loadProgram(newProgram));
	dispatch(updateProgramsList({ current: id, add: id }));
};
// ------------------------ activateSavedProgram --------------------------

// Swap currentProgram and newProgram
// update programsList
export const activateSavedProgram = (data) => (dispatch, getState) => {
	const currentProgram = getConvertedLocalCurrentProgram(getState);
	const newProgram = convertRemoteProgram(data);
	dispatch($.addLocalSavedProgram(currentProgram));
	dispatch($.removeLocalSavedProgram(newProgram));
	dispatch(loadProgram(newProgram));
	dispatch(updateProgramsList({ current: newProgram.id }));
};

// ------------------------- removeSavedProgram ---------------------------

// Remove program data from saved programs array and ID from programs-list
export const removeSavedProgram = (program) => (dispatch) => {
	const { id, isPublic } = program;
	dispatch($.removeLocalSavedProgram(program));
	dispatch(updateProgramsList({ remove: id }));
	if (!isPublic) dispatch(removeRemotePrivateProgram(id));
};

// --------------------- removeRemotePrivateProgram -----------------------

// DELETE program from db
export const removeRemotePrivateProgram = (id) => (dispatch, getState) => {
	dispatch($.removingRemoteProgram());
	const endpoint = "/api/programs/" + id;
	const token = getTokenConfig(getState);
	axios
		.delete(endpoint, token)
		.then(() => dispatch($.remoteProgramRemoved()))
		.catch((err) => dispatch(getError(err, "REMOVE_REMOTE_PROGRAM_FAIL")));
};

// ------------------- removeAllRemotePrivatePrograms ---------------------

// DELETE all private programs corresponding to userId
export const removeAllRemotePrivatePrograms = () => (dispatch, getState) => {
	dispatch($.removingAllRemotePrivatePrograms());
	const token = getTokenConfig(getState);
	axios
		.delete("/api/programs", token)
		.then(() => dispatch($.allRemotePrivateProgramsRemoved()))
		.catch((err) => dispatch(getError(err, "REMOVE_ALL_REMOTE_PROGRAMS_FAIL")));
};
