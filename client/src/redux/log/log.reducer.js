import logActionTypes from "./log.types";
import { getUpdatedEntries } from "./log.utils";

export const INITIAL_STATE = {
	dateUpdated: null,
	isSyncing: false,
	isSynced: false,
	entries: {},
	programId: null, // standard program
};

const {
	CLEAR_LOCAL_LOG,
	CREATING_REMOTE_LOG,
	REMOTE_LOG_CREATED,
	SYNCING_LOG,
	LOG_UP_TO_DATE,
	LOG_SYNCED,
	UPDATE_LOCAL_LOG_PROGRAM_ID,
	UPDATE_LOCAL_LOG_ENTRIES,
	UPDATING_REMOTE_LOG,
	REMOTE_LOG_UPDATED,
} = logActionTypes;

const logReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CREATING_REMOTE_LOG:
		case UPDATING_REMOTE_LOG:
		case SYNCING_LOG: {
			return {
				...state,
				isSyncing: true,
				isSynced: false,
			};
		}
		case REMOTE_LOG_CREATED:
		case REMOTE_LOG_UPDATED:
		case LOG_UP_TO_DATE: {
			return {
				...state,
				isSyncing: false,
				isSynced: true,
			};
		}
		case LOG_SYNCED: {
			return {
				isSyncing: false,
				isSynced: true,
				...action.payload,
			};
		}
		case UPDATE_LOCAL_LOG_ENTRIES: {
			return {
				...state,
				dateUpdated: action.payload.dateUpdated,
				entries: getUpdatedEntries(state, action.payload),
			};
		}
		case UPDATE_LOCAL_LOG_PROGRAM_ID: {
			return {
				...state,
				dateUpdated: action.payload.dateUpdated,
				programId: action.payload.id,
			};
		}
		case CLEAR_LOCAL_LOG: {
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
