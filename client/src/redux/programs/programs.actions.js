import { programsActionTypes as $ } from "./programs.types";

// --- Download multiple programs ---

export const downloadingPrograms = (note) => ({
	type: $.DOWNLOADING_PROGRAMS,
	note,
});

export const programsDownloaded = (data) => ({
	type: $.PROGRAMS_DOWNLADED,
	payload: data,
});

export const programsDownloadFail = (note) => ({
	type: $.PROGRAMS_DOWNLAD_FAIL,
	note,
});

// --- Remove multiple remote private programs ---

export const removingAllRemotePrivatePrograms = () => ({
	type: $.REMOVING_ALL_REMOTE_PRIVATE_PROGRAMS,
});

export const allRemotePrivateProgramsRemoved = () => ({
	type: $.ALL_REMOTE_PRIVATE_PROGRAMS_REMOVED,
});

export const clearLocalPrograms = () => ({
	type: $.CLEAR_LOCAL_PROGRAMS,
});

// --- Update single remote public program ---

export const updatingRemotePublicProgram = () => ({
	type: $.UPDATING_REMOTE_PUBLIC_PROGRAM,
});

export const remotePublicProgramUpdated = () => ({
	type: $.REMOTE_PUBLIC_PROGRAM_UPDATED,
});

// --- Remove single program ---

export const removingRemoteProgram = () => ({
	type: $.REMOVING_REMOTE_PROGRAM,
});

export const remoteProgramRemoved = () => ({
	type: $.REMOTE_PROGRAM_REMOVED,
});

// --- Update local state  ---

export const addLocalSavedProgram = (data) => ({
	type: $.ADD_LOCAL_SAVED_PROGRAM,
	payload: data,
});

export const removeLocalSavedProgram = (data) => ({
	type: $.REMOVE_LOCAL_SAVED_PROGRAM,
	payload: data,
});
