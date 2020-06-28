import axios from "axios";

import protocolActionTypes from "./protocol.types";
import { convertLocalProtocol, convertRemoteProtocol } from "./protocol.utils";
import { getError } from "../error/error.actions";
import { getTokenConfig } from "../utils";

const {
	GET_FIELDS,
	UPDATE_MAX_CUSTOM_REST,
	UPDATE_LOCAL_PROTOCOL,
	CREATING_REMOTE_PROTOCOL,
	UPDATING_REMOTE_PROTOCOL,
	SYNCING_PROTOCOL,
	REMOTE_PROTOCOL_CREATED,
	REMOTE_PROTOCOL_UPDATED,
	PROTOCOL_UP_TO_DATE,
	PROTOCOL_SYNCED,
	CLEAR_LOCAL_PROTOCOL,
} = protocolActionTypes;

// ----------------- Basic -----------------

export const getFields = () => ({
	type: GET_FIELDS,
});

export const updateMaxCustomRest = (data) => ({
	type: UPDATE_MAX_CUSTOM_REST,
	payload: data,
});

export const clearLocalProtocol = () => ({
	type: CLEAR_LOCAL_PROTOCOL,
});

export const creatingRemoteProtocol = () => ({
	type: CREATING_REMOTE_PROTOCOL,
});

export const remoteProtocolCreated = (data) => ({
	type: REMOTE_PROTOCOL_CREATED,
	payload: data,
});

export const syncingProtocol = () => ({
	type: SYNCING_PROTOCOL,
});

export const protocolUpToDate = () => ({
	type: PROTOCOL_UP_TO_DATE,
});

export const protocolSynced = (data) => ({
	type: PROTOCOL_SYNCED,
	payload: data,
});

export const updateLocalProtocol = (data) => ({
	type: UPDATE_LOCAL_PROTOCOL,
	payload: data,
});

export const updatingRemoteProtocol = () => ({
	type: UPDATING_REMOTE_PROTOCOL,
});

export const remoteProtocolUpdated = () => ({
	type: REMOTE_PROTOCOL_UPDATED,
});

// ----------------- Thunk ------------------

// POST local protocol to db
export const createRemoteProtocol = () => (dispatch, getState) => {
	dispatch(creatingRemoteProtocol());
	const remoteProtocol = convertLocalProtocol(getState);
	axios
		.post(
			"/api/protocol/create",
			JSON.stringify(remoteProtocol),
			getTokenConfig(getState)
		)
		.then(() => dispatch(remoteProtocolCreated()))
		.catch((err) => {
			dispatch(getError(err, "CREATE_REMOTE_PROTOCOL_ERROR"));
		});
};

// GET protocol from db
export const syncProtocol = () => (dispatch, getState) => {
	dispatch(syncingProtocol());
	const dateUpdatedLocal = getState().protocol.dateUpdated;
	axios
		.post(
			"/api/protocol/sync",
			JSON.stringify({ dateUpdatedLocal }),
			getTokenConfig(getState)
		)
		.then((res) => {
			if (res.status === 204) dispatch(protocolUpToDate());
			else {
				const localProtocol = convertRemoteProtocol(res.data);
				dispatch(protocolSynced(localProtocol));
			}
		})
		.catch((err) => {
			dispatch(getError(err, "SYNC_LOG_ERROR"));
		});
};

export const updateProtocol = (data) => (dispatch, getState) => {
	const dateUpdated = new Date();
	dispatch(updateLocalProtocol({ ...data, dateUpdated }));

	if (getState().user.isIncognito) return;

	dispatch(updatingRemoteProtocol());
	const remoteProtocol = convertLocalProtocol(getState);

	// POST and replace whole protocol
	axios
		.post(
			"api/protocol/update",
			JSON.stringify({ ...remoteProtocol, dateUpdated }),
			getTokenConfig(getState)
		)
		.then(() => dispatch(remoteProtocolUpdated()))
		.catch((err) => {
			dispatch(getError(err, "UPDATE_REMOTE_PROTOCOL_ERROR"));
		});
};

export const removeRemoteProtocol = (token) => (dispatch) => {
	axios
		.delete("/api/protocol", token)
		.then(() => dispatch(clearLocalProtocol()))
		.catch((err) => dispatch(getError(err, "REMOVE_REMOTE_PROTOCOL_FAIL")));
};
