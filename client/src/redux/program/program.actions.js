import { programActionTypes as $ } from "./program.types";

// ---------------- Create remote ------------------

export const creatingRemoteProgram = () => ({
	type: $.CREATING_REMOTE_PROGRAM,
});

export const remoteProgramCreated = (data) => ({
	type: $.REMOTE_PROGRAM_CREATED,
	payload: data,
});

export const remoteProgramCreateFail = () => ({
	type: $.REMOTE_PROGRAM_CREATE_FAIL,
});

// ----------------- Update remote ------------------

export const updatingRemoteCurrentProgram = () => ({
	type: $.UPDATING_REMOTE_CURRENT_PROGRAM,
});

export const remoteCurrentProgramUpdated = () => ({
	type: $.REMOTE_CURRENT_PROGRAM_UPDATED,
});

export const remoteCurrentProgramUpdateFail = () => ({
	type: $.REMOTE_CURRENT_PROGRAM_UPDATE_FAIL,
});

// ----------------- Publish --------------------

export const publishingCurrentProgram = () => ({
	type: $.PUBLISHING_CURRENT_PROGRAM,
});

export const currentProgramPublished = () => ({
	type: $.CURRENT_PROGRAM_PUBLISHED,
});

export const currentProgramPublishFail = () => ({
	type: $.CURRENT_PROGRAM_PUBLISH_FAIL,
});

// ------------------ Update local --------------------

export const updateLocalCurrentProgram = (data) => ({
	type: $.UPDATE_LOCAL_CURRENT_PROGRAM,
	payload: data,
});

export const updateMaxCustomRest = (data) => ({
	type: $.UPDATE_MAX_CUSTOM_REST,
	payload: data,
});

export const loadProgram = (data) => ({
	type: $.LOAD_PROGRAM,
	payload: data,
});

export const loadStandardProgram = () => ({
	type: $.LOAD_STANDARD_PROGRAM,
});

export const clearLocalCurrentProgram = () => ({
	type: $.CLEAR_LOCAL_CURRENT_PROGRAM,
});
