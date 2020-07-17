import { programsListActionTypes as $ } from "./programs-list.types";

// Create

export const creatingRemoteProgramsList = () => ({
	type: $.CREATING_REMOTE_PROGRAMS_LIST,
});

export const remoteProgramsListCreated = () => ({
	type: $.REMOTE_PROGRAMS_LIST_CREATED,
});

// Update

export const updateLocalProgramsList = (data) => ({
	type: $.UPDATE_LOCAL_PROGRAMS_LIST,
	payload: data,
});

export const updatingRemoteProgramsList = () => ({
	type: $.UPDATING_REMOTE_PROGRAMS_LIST,
});

export const remoteProgramsListUpdated = () => ({
	type: $.REMOTE_PROGRAMS_LIST_UPDATED,
});

// Sync (get if newer than local)

export const syncingProgramList = () => ({
	type: $.SYNCING_PROGRAMS_LIST,
});

export const programsListUpToDate = () => ({
	type: $.PROGRAMS_LIST_UP_TO_DATE,
});

export const programsListSynced = (data) => ({
	type: $.PROGRAMS_LIST_SYNCED,
	payload: data,
});

// Remove

export const clearLocalProgramsList = () => ({
	type: $.CLEAR_LOCAL_PROGRAMS_LIST,
});

export const removingRemoteProgramsList = () => ({
	type: $.REMOVING_REMOTE_PROGRAMS_LIST,
});

export const remoteProgramsListRemoved = () => ({
	type: $.REMOTE_PROGRAMS_LIST_REMOVED,
});
