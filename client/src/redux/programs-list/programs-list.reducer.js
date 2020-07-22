import { programsListActionTypes as $ } from "./programs-list.types";

const INITIAL_STATE = {
	isUpdating: false,
	isUpdated: false,
	dateModified: null,
};

const programsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		// -------------- Remote --------------

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

		// -------------- Local --------------

		case $.MODIFY_LOCAL_SAVED_PROGRAMS_LIST: {
			return {
				...state,
				isUpdated: false,
				...action.payload,
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
