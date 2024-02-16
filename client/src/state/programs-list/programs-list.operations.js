import axios from "axios";

import { getError } from "state/error/error.actions";

import { getTokenConfig, isIncognito } from "../utils";

import * as $ from "./programs-list.actions";
import { getConvertedLocalProgramsList } from "./programs-list.utils";

// ------------------- createRemoteProgramsList ------------------------

// POST current and saved programIds to db
export const createRemoteProgramsList = () => async (dispatch, getState) => {
	dispatch($.creatingRemoteProgramsList());

	try {
		const data = JSON.stringify(getConvertedLocalProgramsList(getState));
		const token = getTokenConfig(getState);

		await axios.post("/api/programs-list", data, token);

		return dispatch($.remoteProgramsListCreated());
	} catch (err) {
		dispatch($.createRemoteProgramsListFail());
		return dispatch(getError(err, "CREATE_REMOTE_PROGRAMS_LIST_ERROR"));
	}
};

// ---------------------- updateProgramsList ---------------------------

// Update programsList content (IDs of saved programs)
// PUT current and saved programIds to db
export const updateProgramsList = () => (dispatch, getState) => {
	const dateModified = new Date();
	dispatch($.modifyLocalSavedProgramsList({ dateModified }));

	if (isIncognito(getState)) return;

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
