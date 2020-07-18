import axios from "axios";

import { getTokenConfig } from "../utils";

import {
	creatingRemoteProgramsList,
	remoteProgramsListCreated,
	updateLocalProgramsList,
	updatingRemoteProgramsList,
	remoteProgramsListUpdated,
	syncingProgramList,
	programsListUpToDate,
	programsListSynced,
	clearLocalProgramsList,
	removingRemoteProgramsList,
	remoteProgramsListRemoved,
} from "./programs-list.actions";
import { getError } from "../error/error.actions";

// -----------------------------------------------------------

// POST programs-list to db // ISSUE: comment inaccurate
export const createRemoteProgramsList = () => (dispatch, getState) => {
	dispatch(creatingRemoteProgramsList());

	// TODO: check if this makes sense. Should't be programsList?
	const localPrograms = getState().programs;

	const newProgramsList = {
		dateUpdated: localPrograms.dateUpdated,
		userId: getState().user.id,
		current: getState().program.id,
		all: localPrograms.saved.map((p) => p.id),
	};

	axios
		.post(
			"/api/programs-list",
			JSON.stringify(newProgramsList),
			getTokenConfig(getState)
		)
		.then(() => dispatch(remoteProgramsListCreated()))
		.catch((err) => {
			dispatch(getError(err, "CREATE_REMOTE_PROGRAMS_LIST_ERROR"));
		});
};

// Update program IDs in progrmsList and PUT changes to remote programsList
export const updateProgramsList = ({ current, add, remove }) => (
	dispatch,
	getState
) => {
	const dateUpdated = new Date();
	dispatch(updateLocalProgramsList({ current, add, remove, dateUpdated }));

	if (getState().user.isIncognito) return;

	dispatch(updatingRemoteProgramsList());
	axios
		.put(
			"/api/programs-list",
			JSON.stringify({ current, add, remove, dateUpdated }),
			getTokenConfig(getState)
		)
		.then(() => dispatch(remoteProgramsListUpdated()))
		.catch((err) => {
			dispatch(getError(err, "UPDATE_REMOTE_LOG_ERROR"));
		});
};

// GET programs list if newer than local
// TODO: POST programs list if newer than remote
export const syncProgramsList = () => async (dispatch, getState) => {
	dispatch(syncingProgramList());
	const dateUpdatedLocal = getState().programsList.dateUpdated;
	try {
		const res = await axios.post(
			"/api/programs-list/sync",
			JSON.stringify({ dateUpdatedLocal }),
			getTokenConfig(getState)
		);
		if (res.status === 204) return dispatch(programsListUpToDate());
		else return dispatch(programsListSynced(res.data));
	} catch (err) {
		return dispatch(getError(err, "SYNC_LOG_ERROR"));
	}
};

// DELETE entire programs-list from db
export const removeRemoteProgramsList = () => (dispatch, getState) => {
	dispatch(clearLocalProgramsList());
	dispatch(removingRemoteProgramsList());
	axios
		.delete("/api/programs-list", getTokenConfig(getState))
		.then(() => dispatch(remoteProgramsListRemoved()))
		.catch((err) => {
			dispatch(getError(err, "REMOVE_REMOTE_PROGRAMS_LIST_ERROR"));
		});
};
