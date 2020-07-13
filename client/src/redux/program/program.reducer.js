import programActionTypes from "./program.types";
import { INITIAL_STATE } from "./program.initialState";
import {
	getUpdatedState,
	getFieldsWithNewMaxCustomRest,
} from "./program.utils";

const {
	UPDATE_MAX_CUSTOM_REST,
	UPDATE_LOCAL_PROGRAM,
	CREATING_REMOTE_PROGRAM,
	UPDATING_REMOTE_PROGRAM,
	SYNCING_PROGRAM,
	REMOTE_PROGRAM_CREATED,
	REMOTE_PROGRAM_UPDATED,
	PROGRAM_UP_TO_DATE,
	PROGRAM_SYNCED,
	CLEAR_LOCAL_PROGRAM,
	PUBLISHING_PROGRAM,
	PROGRAM_PUBLISHED,
	PROGRAM_PUBLISH_FAIL,
	LOAD_PROGRAM,
} = programActionTypes;

const programReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CREATING_REMOTE_PROGRAM:
		case UPDATING_REMOTE_PROGRAM:
		case SYNCING_PROGRAM: {
			return {
				...state,
				isSyncing: true,
				isSynced: false,
			};
		}
		case REMOTE_PROGRAM_CREATED:
		case REMOTE_PROGRAM_UPDATED:
		case PROGRAM_UP_TO_DATE: {
			return {
				...state,
				isSyncing: false,
				isSynced: true,
			};
		}
		case PROGRAM_SYNCED: {
			return {
				...state,
				isSyncing: false,
				isSynced: true,
				...action.payload,
			};
		}
		case UPDATE_MAX_CUSTOM_REST:
			return {
				...state,
				fields: getFieldsWithNewMaxCustomRest(state, action.payload),
			};

		case UPDATE_LOCAL_PROGRAM: {
			return {
				...state,
				dateUpdated: action.payload.dateUpdated,
				...getUpdatedState(state, action.payload),
				isPublished: false,
			};
		}
		case PUBLISHING_PROGRAM: {
			return {
				...state,
				isPublishing: true,
				isPublished: false,
			};
		}
		case PROGRAM_PUBLISHED: {
			return {
				...state,
				isPublishing: false,
				isPublished: true,
			};
		}
		case PROGRAM_PUBLISH_FAIL: {
			return {
				...state,
				isPublishing: false,
				isPublished: false,
			};
		}
		case CLEAR_LOCAL_PROGRAM: {
			return {
				isSyncing: false,
				isSynced: false,
				isPublishing: false,
				isPublished: false,
				dateUpdated: null,
				name: "",
				description: "",
				fields: {},
			};
		}
		case LOAD_PROGRAM: {
			console.log(action.payload);
			return {
				...action.payload,
			};
		}
		default:
			return state;
	}
};

export default programReducer;
