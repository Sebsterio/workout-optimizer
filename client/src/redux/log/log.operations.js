import axios from "axios";

import {
	clearLocalLog,
	creatingRemoteLog,
	remoteLogCreated,
	syncingLog,
	logUpToDate,
	logSynced,
	updateLocalLogEntries,
	updatingRemoteLog,
	remoteLogUpdated,
} from "./log.actions";
import { getError } from "../error/error.actions";

import {
	convertLocalEntries,
	convertRemoteLog,
	convertLocalEntry,
} from "./log.utils";
import { getTokenConfig } from "../utils";

// ----------------------------------------------------------

// POST local log to db
export const createRemoteLog = () => (dispatch, getState) => {
	dispatch(creatingRemoteLog());

	const localLog = getState().log;
	const newRemoteLog = {
		dateUpdated: localLog.dateUpdated,
		userId: getState().user.id,
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

// Add/update/remove entry locally
export const updateLogEntry = (data) => (dispatch) => {
	const dateUpdated = new Date();
	dispatch(updateLocalLogEntries({ ...data, dateUpdated }));
	dispatch(updateRemoteLogEntry(data, dateUpdated));
};

// POST/DELETE entry to db
const updateRemoteLogEntry = (data, dateUpdated) => (dispatch, getState) => {
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

// GET log from db
// TODO: use query params
export const syncLog = () => async (dispatch, getState) => {
	dispatch(syncingLog());
	try {
		const dateUpdatedLocal = getState().log.dateUpdated;
		const res = await axios.post(
			"/api/log/sync",
			JSON.stringify({ dateUpdatedLocal }),
			getTokenConfig(getState)
		);
		if (res.status === 204) return dispatch(logUpToDate());
		else {
			const newLog = convertRemoteLog(res.data);
			return dispatch(logSynced(newLog));
		}
	} catch (err) {
		return dispatch(getError(err, "SYNC_LOG_ERROR"));
	}
};

// DELETE entire log from db
export const removeRemoteLog = (token) => (dispatch) => {
	axios
		.delete("/api/log", token)
		.then(() => dispatch(clearLocalLog()))
		.catch((err) => dispatch(getError(err, "REMOVE_REMOTE_LOG_FAIL")));
};
