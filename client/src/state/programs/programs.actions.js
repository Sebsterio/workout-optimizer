import { programsActionTypes as $ } from "./programs.types";

// ------------------ Remote Collection -------------------------

// --- Download remote collection ---

export const downloadingPrograms = ({ note }) => ({
	type: $.DOWNLOADING_PROGRAMS,
	note,
});

export const programsDownloaded = ({ note }) => ({
	type: $.PROGRAMS_DOWNLADED,
	note,
});

export const programsDownloadFail = ({ note }) => ({
	type: $.PROGRAMS_DOWNLAD_FAIL,
	note,
});

export const programsUpToDate = () => ({
	type: $.PROGRAMS_UP_TO_DATE,
});

// --- Remove remote programs ---

export const removingAllRemotePrivatePrograms = () => ({
	type: $.REMOVING_ALL_REMOTE_PRIVATE_PROGRAMS,
});

export const allRemotePrivateProgramsRemoved = () => ({
	type: $.ALL_REMOTE_PRIVATE_PROGRAMS_REMOVED,
});

// ------------------ Local Collection -------------------------

// --- Modify local collection ---

export const replaceCollection = (data) => ({
	type: $.REPLACE_COLLECTION,
	payload: data,
});

export const addLocalSavedProgram = (data) => ({
	type: $.ADD_LOCAL_SAVED_PROGRAM,
	payload: data,
});

export const removeLocalSavedProgram = (data) => ({
	type: $.REMOVE_LOCAL_SAVED_PROGRAM,
	payload: data,
});

export const setCurrentProgram = (data) => ({
	type: $.SET_CURRENT_PROGRAM,
	payload: data,
});

export const setCurrentStandardProgram = () => ({
	type: $.SET_CURRENT_STANDARD_PROGRAM,
});

export const setEditedProgram = (data) => ({
	type: $.SET_EDITED_PROGRAM,
	payload: data,
});

// --- Remove local collection ---

export const clearLocalProgramsGroup = () => ({
	type: $.CLEAR_LOCAL_PROGRAMS_GROUP,
});

export const clearLocalPrograms = () => ({
	type: $.CLEAR_LOCAL_PROGRAMS,
});

// --------------- Remote Individual program ----------------------

// --- Create remote ---

export const creatingRemoteProgram = (data) => ({
	type: $.CREATING_REMOTE_PROGRAM,
	payload: data,
});

export const remoteProgramCreated = (data) => ({
	type: $.REMOTE_PROGRAM_CREATED,
	payload: data,
});

export const remoteProgramCreateFail = (data) => ({
	type: $.REMOTE_PROGRAM_CREATE_FAIL,
	payload: data,
});

// --- Update remote ---

export const updatingRemoteProgram = (data) => ({
	type: $.UPDATING_REMOTE_PROGRAM,
	payload: data,
});

export const remoteProgramUpdated = (data) => ({
	type: $.REMOTE_PROGRAM_UPDATED,
	payload: data,
});

export const remoteProgramUpdateFail = (data) => ({
	type: $.REMOTE_PROGRAM_UPDATE_FAIL,
	payload: data,
});

// --- Remove remote program ---

export const removingRemoteProgram = (data) => ({
	type: $.REMOVING_REMOTE_PROGRAM,
	payload: data,
});

export const remoteProgramRemoved = (data) => ({
	type: $.REMOTE_PROGRAM_REMOVED,
	payload: data,
});

// --------------- Local individual program ----------------------

// --- Publish local program ---

export const publishingProgram = (data) => ({
	type: $.PUBLISHING_PROGRAM,
	payload: data,
});

export const programPublished = (data) => ({
	type: $.PROGRAM_PUBLISHED,
	payload: data,
});

export const programPublishFail = (data) => ({
	type: $.PROGRAM_PUBLISH_FAIL,
	payload: data,
});

// --- Modify local program ---

export const modifyLocalSavedProgram = (data) => ({
	type: $.MODIFY_LOCAL_SAVED_PROGRAM,
	payload: data,
});

// TODO: move to log redux
export const modifyMaxCustomRest = (data) => ({
	type: $.MODIFY_MAX_CUSTOM_REST,
	payload: data,
});
