import { logActionTypes as $ } from "./log.types";
import { getUpdatedEntries } from "./log.utils";

export const INITIAL_STATE = {
	dateUpdated: null,
	isSyncing: false,
	isSynced: false,
	entries: {},
	programId: null, // standard program
};

const logReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case $.CREATING_REMOTE_LOG:
		case $.UPDATING_REMOTE_LOG:
		case $.SYNCING_LOG: {
			return {
				...state,
				isSyncing: true,
				isSynced: false,
			};
		}
		case $.REMOTE_LOG_CREATED:
		case $.LOG_UP_TO_DATE:
		case $.REMOTE_LOG_UPDATED: {
			return {
				...state,
				isSyncing: false,
				isSynced: true,
			};
		}
		case $.CREATE_REMOTE_LOG_FAIL:
		case $.SYNC_LOG_FAIL:
		case $.UPDATE_REMOTE_LOG_FAIL: {
			return {
				...state,
				isSyncing: false,
				isSynced: false,
			};
		}
		case $.LOG_SYNCED: {
			return {
				isSyncing: false,
				isSynced: true,
				...action.payload,
			};
		}
		case $.UPDATE_LOCAL_LOG_ENTRIES: {
			return {
				...state,
				dateUpdated: action.payload.dateUpdated,
				entries: getUpdatedEntries(state, action.payload),
			};
		}
		case $.CLEAR_LOCAL_LOG: {
			return {
				isSyncing: false,
				isSynced: false,
				dateUpdated: null,
				entries: {},
			};
		}
		default:
			return state;
	}
};

export default logReducer;
