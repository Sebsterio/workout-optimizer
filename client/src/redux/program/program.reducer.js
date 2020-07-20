import { programActionTypes as $ } from "./program.types";
import { standardProgram } from "./standardProgram";
import {
	getUpdatedFields,
	getFieldsWithNewMaxCustomRest,
} from "./program.utils";

const INITIAL_STATE = {
	// status
	isUpdating: false,
	isUpdated: false,
	isPublishing: false,
	isPublished: false, // does a public copy exist
	isPublic: false, // is this a public copy

	// data
	id: null,
	dateModified: null,
	name: "",
	description: "",
	fields: [],
};

const programReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		// ------- Create remote, Update remote ------

		case $.CREATING_REMOTE_PROGRAM:
		case $.UPDATING_REMOTE_CURRENT_PROGRAM: {
			return {
				...state,
				isUpdating: true,
				isUpdated: false,
			};
		}
		case $.REMOTE_PROGRAM_CREATED:
		case $.REMOTE_CURRENT_PROGRAM_UPDATED: {
			return {
				...state,
				isUpdating: false,
				isUpdated: true,
			};
		}
		case $.REMOTE_PROGRAM_CREATE_FAIL:
		case $.REMOTE_CURRENT_PROGRAM_UPDATE_FAIL: {
			return {
				...state,
				isUpdating: false,
				isUpdated: false,
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
			const { dateModified, replaceProps } = action.payload;
			const { fields } = state;
			return {
				...state,
				dateModified,
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
