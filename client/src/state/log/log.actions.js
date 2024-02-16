import { logActionTypes as $ } from "./log.types";

// -------------- Create remote ---------------

export const creatingRemoteLog = () => ({
	type: $.CREATING_REMOTE_LOG,
});

export const remoteLogCreated = (data) => ({
	type: $.REMOTE_LOG_CREATED,
	payload: data,
});

export const createRemoteLogFail = () => ({
	type: $.CREATE_REMOTE_LOG_FAIL,
});

// ------------------ Sync --------------------

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

export const syncLogFail = () => ({
	type: $.SYNC_LOG_FAIL,
});

// -------------- Update remote -----------------

export const updatingRemoteLog = () => ({
	type: $.UPDATING_REMOTE_LOG,
});

export const remoteLogUpdated = () => ({
	type: $.REMOTE_LOG_UPDATED,
});

export const updateRemoteLogFail = () => ({
	type: $.UPDATE_REMOTE_LOG_FAIL,
});

// -------------- Update local -----------------

export const updateLocalLogEntries = (data) => ({
	type: $.UPDATE_LOCAL_LOG_ENTRIES,
	payload: data,
});

export const clearLocalLog = () => ({
	type: $.CLEAR_LOCAL_LOG,
});
