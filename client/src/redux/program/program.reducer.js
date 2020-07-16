import { programActionTypes as $ } from "./program.types";
import { INITIAL_STATE } from "./program.initialState";
import {
	getUpdatedFields,
	getFieldsWithNewMaxCustomRest,
} from "./program.utils";

const programReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case $.CREATING_REMOTE_PROGRAM:
		case $.UPDATING_REMOTE_PROGRAM:
		case $.SYNCING_PROGRAM: {
			return {
				...state,
				isSyncing: true,
				isSynced: false,
			};
		}
		case $.REMOTE_PROGRAM_CREATED:
		case $.REMOTE_PROGRAM_UPDATED:
		case $.PROGRAM_UP_TO_DATE: {
			return {
				...state,
				isSyncing: false,
				isSynced: true,
			};
		}
		case $.PROGRAM_SYNCED: {
			return {
				...state,
				isSyncing: false,
				isSynced: true,
				...action.payload,
			};
		}
		case $.UPDATE_MAX_CUSTOM_REST:
			return {
				...state,
				fields: getFieldsWithNewMaxCustomRest(state, action.payload),
			};

		case $.UPDATE_LOCAL_PROGRAM: {
			return {
				...state,
				...action.payload,
				isPublished: false,
			};
		}
		case $.UPDATE_LOCAL_PROGRAM_FIELDS: {
			return {
				...state,
				dateUpdated: action.payload.dateUpdated,
				fields: [...getUpdatedFields(state, action.payload)],
				isPublished: false,
			};
		}
		case $.PUBLISHING_PROGRAM: {
			return {
				...state,
				isPublishing: true,
				isPublished: false,
			};
		}
		case $.PROGRAM_PUBLISHED: {
			return {
				...state,
				isPublishing: false,
				isPublished: true,
			};
		}
		case $.PROGRAM_PUBLISH_FAIL: {
			return {
				...state,
				isPublishing: false,
				isPublished: false,
			};
		}
		case $.CLEAR_LOCAL_PROGRAM: {
			return {
				isSyncing: false,
				isSynced: false,
				isPublishing: false,
				isPublished: false,
				isPublic: false,
				dateUpdated: null,
				name: "",
				description: "",
				fields: [],
			};
		}
		case $.RESET_LOCAL_PROGRAM: {
			return {
				...INITIAL_STATE,
			};
		}
		case $.LOAD_PROGRAM: {
			return {
				...action.payload,
			};
		}
		default:
			return state;
	}
};

export default programReducer;
