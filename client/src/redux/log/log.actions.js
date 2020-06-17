import axios from "axios";

import logActionTypes from "./log.types";
import { getError } from "../error/error.actions";
import { getTokenConfig } from "../utils";
import {
	convertLocalEntries,
	convertRemoteEntries,
	convertLocalEntry,
} from "./log.utils";

const {
	CLEAR_LOCAL_LOG,
	CREATING_REMOTE_LOG,
	REMOTE_LOG_CREATED,
	SYNCING_LOG,
	LOG_UP_TO_DATE,
	LOG_SYNCED,
	UPDATE_LOCAL_LOG,
	UPDATING_REMOTE_LOG,
	REMOTE_LOG_UPDATED,
} = logActionTypes;

// ----------------- Basic -----------------

export const clearLocalLog = () => ({
	type: CLEAR_LOCAL_LOG,
});

export const creatingRemoteLog = () => ({
	type: CREATING_REMOTE_LOG,
});

export const remoteLogCreated = (data) => ({
	type: REMOTE_LOG_CREATED,
	payload: data,
});

export const syncingLog = () => ({
	type: SYNCING_LOG,
});

export const logUpToDate = () => ({
	type: LOG_UP_TO_DATE,
});

export const logSynced = (data) => ({
	type: LOG_SYNCED,
	payload: data,
});

export const updateLocalLog = (data) => ({
	type: UPDATE_LOCAL_LOG,
	payload: data,
});

export const updatingRemoteLog = () => ({
	type: UPDATING_REMOTE_LOG,
});

export const remoteLogUpdated = () => ({
	type: REMOTE_LOG_UPDATED,
});

// ----------------- Thunk ------------------

// POST local log to db
export const createRemoteLog = () => (dispatch, getState) => {
	dispatch(creatingRemoteLog());

	const localLog = getState().log;
	const newRemoteLog = {
		dateUpdated: localLog.dateUpdated,
		userId: getState().user._id,
		PTs: [],
		entries: convertLocalEntries(localLog.entries),
	};

	axios
		.post(
			"/api/log/create",
			JSON.stringify(newRemoteLog),
			getTokenConfig(getState)
		)
		.then(() => dispatch(remoteLogCreated()))
		.catch((err) => {
			dispatch(getError(err, "CREATE_REMOTE_LOG_ERROR"));
		});
};

// GET log from db
export const syncLog = () => (dispatch, getState) => {
	dispatch(syncingLog());
	const dateUpdatedLocal = getState().log.dateUpdated;
	axios
		.post(
			"/api/log/sync",
			JSON.stringify({ dateUpdatedLocal }),
			getTokenConfig(getState)
		)
		.then((res) => {
			if (res.status === 204) dispatch(logUpToDate());
			// TODO: compare dateUpdated of remote and local and prompt user about action
			else {
				const remoteLog = res.data;
				const localLog = {
					dateUpdated: remoteLog.dateUpdated,
					PTs: remoteLog.PTs,
					entries: convertRemoteEntries(remoteLog.entries),
				};
				dispatch(logSynced(localLog));
			}
		})
		.catch((err) => {
			dispatch(getError(err, "SYNC_LOG_ERROR"));
		});
};

// Add/update/remove entry locally & POST/DELETE to db
export const updateLog = (data) => (dispatch, getState) => {
	const dateUpdated = new Date();
	dispatch(updateLocalLog({ ...data, dateUpdated }));

	if (getState().user.isIncognito) return;

	dispatch(updatingRemoteLog());

	const entryName = data.dateStr.replace(/ /g, "_");
	const entryValue = getState().log.entries[entryName];
	const remoteEntry = convertLocalEntry(entryName, entryValue);

	// POST and replace whole entry or DELETE if empty
	axios
		.post(
			"api/log/entry",
			JSON.stringify({ ...remoteEntry, dateUpdated }),
			getTokenConfig(getState)
		)
		.then(() => dispatch(remoteLogUpdated()))
		.catch((err) => {
			dispatch(getError(err, "UPDATE_REMOTE_LOG_ERROR"));
		});
};

export const removeRemoteLog = (token) => (dispatch) => {
	axios
		.delete("/api/log", token)
		.then(() => dispatch(clearLocalLog()))
		.catch((err) => dispatch(getError(err, "REMOVE_REMOTE_LOG_FAIL")));
};
