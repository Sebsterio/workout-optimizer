import { logActionTypes as $ } from "./log.types";

export const clearLocalLog = () => ({
	type: $.CLEAR_LOCAL_LOG,
});

export const creatingRemoteLog = () => ({
	type: $.CREATING_REMOTE_LOG,
});

export const remoteLogCreated = (data) => ({
	type: $.REMOTE_LOG_CREATED,
	payload: data,
});

export const syncingLog = () => ({
	type: $.SYNCING_LOG,
});

export const logUpToDate = () => ({
	type: $.LOG_UP_TO_DATE,
});

export const logSynced = (data) => ({
	type: $.LOG_SYNCED,
	payload: data,
});

export const updateLocalLogProgramId = (data) => ({
	type: $.UPDATE_LOCAL_LOG_PROGRAM_ID,
	payload: data,
});

export const updateLocalLogEntries = (data) => ({
	type: $.UPDATE_LOCAL_LOG_ENTRIES,
	payload: data,
});

export const updatingRemoteLog = () => ({
	type: $.UPDATING_REMOTE_LOG,
});

export const remoteLogUpdated = () => ({
	type: $.REMOTE_LOG_UPDATED,
});
