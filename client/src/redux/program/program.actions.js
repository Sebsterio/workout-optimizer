import { programActionTypes as $ } from "./program.types";

export const updateMaxCustomRest = (data) => ({
	type: $.UPDATE_MAX_CUSTOM_REST,
	payload: data,
});

export const clearLocalCurrentProgram = () => ({
	type: $.CLEAR_LOCAL_PROGRAM,
});

export const creatingRemoteProgram = () => ({
	type: $.CREATING_REMOTE_PROGRAM,
});

export const remoteProgramCreated = (data) => ({
	type: $.REMOTE_PROGRAM_CREATED,
	payload: data,
});

export const syncingProgram = () => ({
	type: $.SYNCING_PROGRAM,
});

export const programUpToDate = () => ({
	type: $.PROGRAM_UP_TO_DATE,
});

export const programSynced = (data) => ({
	type: $.PROGRAM_SYNCED,
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

export const updatingRemoteProgram = () => ({
	type: $.UPDATING_REMOTE_PROGRAM,
});

export const remoteProgramUpdated = () => ({
	type: $.REMOTE_PROGRAM_UPDATED,
});

export const publishingCurrentProgram = () => ({
	type: $.PUBLISHING_PROGRAM,
});

export const currentProgramPublished = () => ({
	type: $.PROGRAM_PUBLISHED,
});

export const programPublishFail = () => ({
	type: $.PROGRAM_PUBLISH_FAIL,
});

export const resetLocalCurrentProgram = () => ({
	type: $.RESET_LOCAL_PROGRAM,
});
