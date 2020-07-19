import { programActionTypes as $ } from "./program.types";
import { standardProgram } from "./standardProgram";
import {
	getUpdatedFields,
	getFieldsWithNewMaxCustomRest,
} from "./program.utils";

const INITIAL_STATE = {
	// status
	isSyncing: false,
	isSynced: false,
	isPublishing: false,
	isPublished: false, // does a public copy exist
	isPublic: false, // is this a public copy

	// data
	id: undefined, // null === standard program
	dateUpdated: null,
	name: "",
	description: "",
	fields: [],
};

const programReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		// ------- Create remote, Update remote, Sync ------

		case $.CREATING_REMOTE_PROGRAM:
		case $.UPDATING_REMOTE_CURRENT_PROGRAM:
		case $.SYNCING_CURRENT_PROGRAM: {
			return {
				...state,
				isSyncing: true,
				isSynced: false,
			};
		}
		case $.REMOTE_PROGRAM_CREATED:
		case $.REMOTE_CURRENT_PROGRAM_UPDATED:
		case $.CURRENT_PROGRAM_UP_TO_DATE: {
			return {
				...state,
				isSyncing: false,
				isSynced: true,
			};
		}
		case $.REMOTE_PROGRAM_CREATE_FAIL:
		case $.REMOTE_CURRENT_PROGRAM_UPDATE_FAIL:
		case $.CURRENT_PROGRAM_SYNC_FAIL: {
			return {
				...state,
				isSyncing: false,
				isSynced: false,
			};
		}
		case $.CURRENT_PROGRAM_SYNCED: {
			return {
				...state,
				isSyncing: false,
				isSynced: true,
				...action.payload,
			};
		}

		// ----------------- Publish ------------------

		case $.PUBLISHING_CURRENT_PROGRAM: {
			return {
				...state,
				isPublishing: true,
				isPublished: false,
			};
		}
		case $.CURRENT_PROGRAM_PUBLISHED: {
			return {
				...state,
				isPublishing: false,
				isPublished: true,
			};
		}
		case $.CURRENT_PROGRAM_PUBLISH_FAIL: {
			return {
				...state,
				isPublishing: false,
				isPublished: false,
			};
		}

		// ---------------- Update local -----------------

		case $.UPDATE_LOCAL_CURRENT_PROGRAM: {
			const { dateUpdated, replaceProps } = action.payload;
			const { fields } = state;
			console.log(action.payload);
			return {
				...state,
				dateUpdated,
				isPublished: false,
				fields: getUpdatedFields(fields, action.payload),
				...replaceProps, // last (overwrite rest)
			};
		}
		case $.UPDATE_MAX_CUSTOM_REST:
			return {
				...state,
				fields: getFieldsWithNewMaxCustomRest(state, action.payload),
			};

		case $.LOAD_PROGRAM: {
			return { ...action.payload };
		}

		case $.LOAD_STANDARD_PROGRAM: {
			return { ...standardProgram };
		}

		case $.CLEAR_LOCAL_CURRENT_PROGRAM: {
			return { ...INITIAL_STATE };
		}

		default:
			return state;
	}
};

export default programReducer;
