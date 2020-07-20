import axios from "axios";

import * as $ from "./programs-list.actions";
import { getError } from "../error/error.actions";
import { getConvertedLocalProgramsList } from "./programs-list.utils";
import { getTokenConfig } from "../utils";

// ------------------- createRemoteProgramsList ------------------------

// POST local programs-list to db
export const createRemoteProgramsList = () => (dispatch, getState) => {
	dispatch($.creatingRemoteProgramsList());

	const data = JSON.stringify(getConvertedLocalProgramsList(getState));
	const token = getTokenConfig(getState);

	axios
		.post("/api/programs-list", data, token)
		.then(() => dispatch($.remoteProgramsListCreated()))
		.catch((err) => {
			dispatch($.createRemoteProgramsListFail());
			dispatch(getError(err, "CREATE_REMOTE_PROGRAMS_LIST_ERROR"));
		});
};

// ---------------------- updateProgramsList ---------------------------

// Update programsList content (IDs of saved programs)
// PUT entire programsList to db
export const updateProgramsList = (payload) => (dispatch, getState) => {
	const dateUpdated = new Date();
	dispatch($.updateLocalProgramsList({ ...payload, dateUpdated }));

	if (getState().user.isIncognito) return;

	dispatch($.updatingRemoteProgramsList());

	const data = JSON.stringify(getConvertedLocalProgramsList(getState));
	const token = getTokenConfig(getState);

	axios
		.put("/api/programs-list", data, token)
		.then(() => dispatch($.remoteProgramsListUpdated()))
		.catch((err) => {
			dispatch($.updateRemoteProgramsListFail());
			dispatch(getError(err, "UPDATE_REMOTE_LOG_ERROR"));
		});
};

// ----------------------- syncProgramsList ----------------------------

// GET user's programsList if newer than local
// TODO: POST if newer than remote
export const syncProgramsList = () => async (dispatch, getState) => {
	dispatch($.syncingProgramList());

	const dateUpdatedLocal = getState().programsList.dateUpdated;
	const data = JSON.stringify({ dateUpdatedLocal });
	const token = getTokenConfig(getState);

	try {
		const res = await axios.post("/api/programs-list/sync", data, token);
		if (res.status === 204) return dispatch($.programsListUpToDate());
		else return dispatch($.programsListSynced(res.data));
	} catch (err) {
		dispatch($.syncProgramsListFail());
		return dispatch(getError(err, "SYNC_LOG_ERROR"));
	}
};

// ------------------- removeRemoteProgramsList ------------------------

// DELETE entire programs-list from db
export const removeRemoteProgramsList = () => (dispatch, getState) => {
	dispatch($.removingRemoteProgramsList());
	const token = getTokenConfig(getState);
	axios
		.delete("/api/programs-list", token)
		.then(() => dispatch($.remoteProgramsListRemoved()))
		.catch((err) => {
			dispatch($.removeRemoteProgramsListFail());
			dispatch(getError(err, "REMOVE_REMOTE_PROGRAMS_LIST_ERROR"));
		});
};
