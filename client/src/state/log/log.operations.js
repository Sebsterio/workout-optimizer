import axios from "axios";

import { getError } from "../error/error.actions";
import { getTokenConfig, isIncognito } from "../utils";

import * as $ from "./log.actions";
import { convertLocalEntries, convertLocalEntry, convertRemoteLog } from "./log.utils";

// -------------------- createRemoteLog ------------------------

// POST local log to db
export const createRemoteLog = () => (dispatch, getState) => {
	if (isIncognito(getState)) return;

	dispatch($.creatingRemoteLog());

	const localLog = getState().log;
	const newRemoteLog = {
		dateModified: localLog.dateModified,
		userId: getState().user.id,
		entries: convertLocalEntries(localLog.entries),
	};
	const data = JSON.stringify(newRemoteLog);
	const token = getTokenConfig(getState);

	axios
		.post("/api/log/create", data, token)
		.then(() => dispatch($.remoteLogCreated()))
		.catch((err) => {
			dispatch($.createRemoteLogFail());
			dispatch(getError(err, "CREATE_REMOTE_LOG_ERROR"));
		});
};

// ----------------------- syncLog ---------------------------

// GET user's log from db (TODO: ...if newer than local)
// TODO: POST if newer than remote
export const syncLog = () => async (dispatch, getState) => {
	if (isIncognito(getState)) return;

	dispatch($.syncingLog());

	try {
		const dateModifiedLocal = getState().log.dateModified;
		const data = JSON.stringify({ dateModifiedLocal });
		const token = getTokenConfig(getState);

		const res = await axios.post("/api/log/sync", data, token);

		if (res.status === 204) return dispatch($.logUpToDate());
		else return dispatch($.logSynced(convertRemoteLog(res.data)));
	} catch (err) {
		dispatch($.syncLogFail());
		return dispatch(getError(err, "SYNC_LOG_ERROR"));
	}
};

// -------------------- updateLogEntry ------------------------

// Add/update/remove local log entry &&
// POST and replace whole entry or DELETE if empty
export const updateLogEntry = (data) => (dispatch, getState) => {
	const dateModified = new Date();
	dispatch($.updateLocalLogEntries({ ...data, dateModified }));

	if (isIncognito(getState)) return;

	dispatch($.updatingRemoteLog());

	const entryName = data.dateStr.replace(/ /g, "_");
	const entryValue = getState().log.entries[entryName];
	const remoteEntry = convertLocalEntry(entryName, entryValue);
	const json = JSON.stringify({ ...remoteEntry, dateModified });
	const token = getTokenConfig(getState);

	axios
		.post("api/log/entry", json, token)
		.then(() => dispatch($.remoteLogUpdated()))
		.catch((err) => {
			dispatch($.updateRemoteLogFail());
			dispatch(getError(err, "UPDATE_REMOTE_LOG_ERROR"));
		});
};

// -------------------- removeRemoteLog ------------------------

// DELETE entire log from db
// TODO: add status actions (or not?)
export const removeRemoteLog = (token) => (dispatch) => {
	axios
		.delete("/api/log", token)
		.then(() => dispatch($.clearLocalLog()))
		.catch((err) => dispatch(getError(err, "REMOVE_REMOTE_LOG_FAIL")));
};
