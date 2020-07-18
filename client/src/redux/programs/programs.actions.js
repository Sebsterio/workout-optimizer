import { programsActionTypes as $ } from "./programs.types";

// --- multiple programs ---

export const downloadingPrograms = () => ({
	type: $.DOWNLOADING_PROGRAMS,
});

export const programsDownloaded = (data) => ({
	type: $.PROGRAMS_DOWNLADED,
	payload: data,
});

export const programsDownloadFail = () => ({
	type: $.PROGRAMS_DOWNLAD_FAIL,
});

export const removingAllRemotePrivatePrograms = () => ({
	type: $.REMOVING_ALL_REMOTE_PRIVATE_PROGRAMS,
});

export const allRemotePrivateProgramsRemoved = () => ({
	type: $.ALL_REMOTE_PRIVATE_PROGRAMS_REMOVED,
});

export const clearLocalPrograms = () => ({
	type: $.CLEAR_LOCAL_PROGRAMS,
});

// --- single program local ---

export const addSavedProgram = (data) => ({
	type: $.ADD_SAVED_PROGRAM,
	payload: data,
});

export const removeLocalSavedProgram = (data) => ({
	type: $.REMOVE_LOCAL_SAVED_PROGRAM,
	payload: data,
});

// --- single program remote ---

export const removingRemoteProgram = () => ({
	type: $.REMOVING_REMOTE_PROGRAM,
});

export const remoteProgramRemoved = () => ({
	type: $.REMOTE_PROGRAM_REMOVED,
});

export const updatingRemotePublicProgram = () => ({
	type: $.UPDATING_REMOTE_PUBLIC_PROGRAM,
});

export const remotePublicProgramUpdated = () => ({
	type: $.REMOTE_PUBLIC_PROGRAM_UPDATED,
});
