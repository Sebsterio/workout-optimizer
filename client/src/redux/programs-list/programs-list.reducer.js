import { programsListActionTypes as $ } from "./programs-list.types";

import { getUpdatedAllList } from "./programs-list.utils";

const INITIAL_STATE = {
	// status
	isSyncing: false,
	isSynced: false,
	isUpdating: false,
	isUpdated: false,

	// data
	dateUpdated: null,
	current: "standard",
	all: ["standard"],
};

const programsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		// ------- sync ------

		case $.SYNCING_PROGRAMS_LIST: {
			return {
				...state,
				isSyncing: true,
				isSynced: false,
			};
		}

		case $.PROGRAMS_LIST_SYNCED: {
			return {
				...state,
				isSyncing: false,
				isSynced: true,
				...action.payload,
			};
		}

		case $.PROGRAMS_LIST_UP_TO_DATE: {
			return {
				...state,
				isSyncing: false,
				isSynced: true,
			};
		}

		case $.SYNC_PROGRAMS_LIST_FAIL: {
			return {
				...state,
				isSyncing: false,
				isSynced: false,
			};
		}

		// ------- create/update/remove remote ------

		case $.CREATING_REMOTE_PROGRAMS_LIST:
		case $.UPDATING_REMOTE_PROGRAMS_LIST:
		case $.REMOVING_REMOTE_PROGRAMS_LIST: {
			return {
				...state,
				isUpdating: true,
				isUpdated: false,
			};
		}

		case $.REMOTE_PROGRAMS_LIST_CREATED:
		case $.REMOTE_PROGRAMS_LIST_UPDATED:
		case $.REMOTE_PROGRAMS_LIST_REMOVED: {
			return {
				...state,
				isUpdating: false,
				isUpdated: true,
			};
		}

		case $.CREATE_REMOTE_PROGRAMS_LIST_FAIL:
		case $.UPDATE_REMOTE_PROGRAMS_LIST_FAIL:
		case $.REMOVE_REMOTE_PROGRAMS_LIST_FAIL: {
			return {
				...state,
				isUpdating: false,
				isUpdated: false,
			};
		}

		// ------- update local ------

		case $.UPDATE_LOCAL_PROGRAMS_LIST: {
			const { current, add, remove, dateUpdated } = action.payload;
			return {
				...state,
				isUpdated: false,
				dateUpdated,
				current: current ? current : state.current,
				all: getUpdatedAllList(state.all, add, remove),
			};
		}
		case $.CLEAR_LOCAL_PROGRAMS_LIST: {
			return {
				...INITIAL_STATE,
			};
		}

		default:
			return state;
	}
};

export default programsReducer;
