import axios from "axios";

import logActionTypes from "./log.types";
import { getError, clearError } from "../error/error.actions";
import { getTokenConfig } from "../utils";

const {
	CREATING_LOG,
	LOG_CREATED,
	SYNCING_LOG,
	LOG_SYNCED,
	ADD_ENTRY,
	REMOVE_ENTRY,
} = logActionTypes;

// ----------------- Basic -----------------

export const creatingLog = (data) => ({
	type: CREATING_LOG,
});
export const logCreated = (data) => ({
	type: LOG_CREATED,
	payload: data,
});

export const syncingLog = (data) => ({
	type: SYNCING_LOG,
	payload: data,
});

export const logSynced = (data) => ({
	type: LOG_SYNCED,
	payload: data,
});

export const addEntry = (data) => ({
	type: ADD_ENTRY,
	payload: data,
});

export const removeEntry = (data) => ({
	type: REMOVE_ENTRY,
	payload: data,
});

// ----------------- Thunk ------------------

// aux
const convertLocalLog = (localLog) => ({
	dateUpdated: localLog.dateUpdated,
	entries: Object.entries(localLog.entries).map((entry) => ({
		dateStr: entry[0].split("_").join(" "),
		content: JSON.stringify(entry[1]),
	})),
});

const convertRemoteLog = (remoteLog) => {
	console.log(remoteLog);
	const entries = {};
	remoteLog.entries.forEach((entry) => {
		const entryName = entry.dateStr.replace(/ /g, "_");
		const content = JSON.parse(entry.content);
		entries[entryName] = content;
	});
	return {
		dateUpdated: remoteLog.dateUpdated,
		entries,
	};
};

export const createLog = (newUserData) => (dispatch, getState) => {
	dispatch(creatingLog());

	const localLog = getState().log;
	const remoteLog = convertLocalLog(localLog);
	remoteLog.userId = newUserData.id;
	remoteLog.PTs = [];

	axios
		.post("/api/log", JSON.stringify(remoteLog), getTokenConfig(getState))
		.then((res) => dispatch(logCreated()))
		.catch((err) => {
			const { data, status } = err.response;
			dispatch(getError(data, status, "SYNC_ERROR"));
		});
};

export const syncLog = () => (dispatch, getState) => {
	dispatch(syncingLog());
	axios
		.get("/api/log", getTokenConfig(getState))
		.then((res) => dispatch(logSynced(convertRemoteLog(res.data))))
		.catch((err) => {
			console.dir(err);
			const { data, status } = err.response;
			dispatch(getError(data, status, "SYNC_ERROR"));
		});
};

export const updateEntry = () => {};
