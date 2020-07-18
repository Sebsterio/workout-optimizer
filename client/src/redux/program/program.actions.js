import { programActionTypes as $ } from "./program.types";

export const updateMaxCustomRest = (data) => ({
	type: $.UPDATE_MAX_CUSTOM_REST,
	payload: data,
});

export const clearLocalCurrentProgram = () => ({
	type: $.CLEAR_LOCAL_CURRENT_PROGRAM,
});

export const creatingRemoteProgram = () => ({
	type: $.CREATING_REMOTE_PROGRAM,
});

export const remoteProgramCreated = (data) => ({
	type: $.REMOTE_PROGRAM_CREATED,
	payload: data,
});

export const syncingCurrentProgram = () => ({
	type: $.SYNCING_CURRENT_PROGRAM,
});

export const currentProgramUpToDate = () => ({
	type: $.CURRENT_PROGRAM_UP_TO_DATE,
});

export const currentProgramSynced = (data) => ({
	type: $.CURRENT_PROGRAM_SYNCED,
	payload: data,
});

export const updateLocalCurrentProgram = (data) => ({
	type: $.UPDATE_LOCAL_PROGRAM,
	payload: data,
});
export const updateLocalCurrentProgramFields = (data) => ({
	type: $.UPDATE_LOCAL_PROGRAM_FIELDS,
	payload: data,
});

export const updatingRemoteCurrentProgram = () => ({
	type: $.UPDATING_REMOTE_CURRENT_PROGRAM,
});

export const remoteCurrentProgramUpdated = () => ({
	type: $.REMOTE_CURRENT_PROGRAM_UPDATED,
});

export const publishingCurrentProgram = () => ({
	type: $.PUBLISHING_CURRENT_PROGRAM,
});

export const currentProgramPublished = () => ({
	type: $.CURRENT_PROGRAM_PUBLISHED,
});

export const currentProgramPublishFail = () => ({
	type: $.CURRENT_PROGRAM_PUBLISH_FAIL,
});

export const resetLocalCurrentProgram = () => ({
	type: $.RESET_LOCAL_CURRENT_PROGRAM,
});
