import { programsActionTypes as $ } from "./programs.types";

// --- multiple programs ---

export const downloadingPrograms = () => ({
	type: $.DOWNLOADING_PROGRAMS,
});
export const programsDownloadSuccess = (data) => ({
	type: $.PROGRAMS_DOWNLAD_SUCCESS,
	payload: data,
});
export const programsDownloadFail = (data) => ({
	type: $.PROGRAMS_DOWNLAD_FAIL,
	payload: data,
});
export const removingAllRemotePrograms = () => ({
	type: $.REMOVING_ALL_REMOTE_PROGRAMS,
});

export const allRemoteProgramsRemoved = () => ({
	type: $.ALL_REMOTE_PROGRAMS_REMOVED,
});

export const clearLocalPrograms = () => ({
	type: $.CLEAR_LOCAL_PROGRAMS,
});

// --- single program local ---

export const addPrivateProgram = (data) => ({
	type: $.ADD_PRIVATE_PROGRAM,
	payload: data,
});

export const removeLocalPrivateProgram = (data) => ({
	type: $.REMOVE_LOCAL_PRIVATE_PROGRAM,
	payload: data,
});

// --- single program remote ---

export const removingRemoteProgram = () => ({
	type: $.REMOVING_REMOTE_PROGRAM,
});

export const remoteProgramRemoved = () => ({
	type: $.REMOTE_PROGRAM_REMOVED,
});
