import axios from "axios";

import * as $ from "./programs-list.actions";
import { getError } from "redux/error/error.actions";
import { getConvertedLocalProgramsList } from "./programs-list.utils";
import { getTokenConfig, isIncognito } from "../utils";

// ------------------- createRemoteProgramsList ------------------------

// POST current and saved programIds to db
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
// PUT current and saved programIds to db
export const updateProgramsList = () => (dispatch, getState) => {
	const dateModified = new Date();
	dispatch($.updateLocalProgramsList({ dateModified }));

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
