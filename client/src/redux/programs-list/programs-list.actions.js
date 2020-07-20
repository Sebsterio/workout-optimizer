import { programsListActionTypes as $ } from "./programs-list.types";

// Create

export const creatingRemoteProgramsList = () => ({
	type: $.CREATING_REMOTE_PROGRAMS_LIST,
});

export const remoteProgramsListCreated = () => ({
	type: $.REMOTE_PROGRAMS_LIST_CREATED,
});

export const createRemoteProgramsListFail = () => ({
	type: $.CREATE_REMOTE_PROGRAMS_LIST_FAIL,
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

export const updateRemoteProgramsListFail = () => ({
	type: $.UPDATE_REMOTE_PROGRAMS_LIST_FAIL,
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

export const removeRemoteProgramsListFail = () => ({
	type: $.REMOVE_REMOTE_PROGRAMS_LIST_FAIL,
});
