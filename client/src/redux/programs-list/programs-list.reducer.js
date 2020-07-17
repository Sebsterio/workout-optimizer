import { programsListActionTypes as $ } from "./programs-list.types";

import { getUpdateAllList } from "./programs-list.utils";

const INITIAL_STATE = {
	updating: false,
	dateUpdated: null,
	current: null,
	all: [],
};

const programsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case $.CREATING_REMOTE_PROGRAMS_LIST:
		case $.UPDATING_REMOTE_PROGRAMS_LIST:
		case $.SYNCING_PROGRAMS_LIST:
		case $.REMOVING_REMOTE_PROGRAMS_LIST: {
			return {
				...state,
				updating: true,
			};
		}
		case $.REMOTE_PROGRAMS_LIST_CREATED:
		case $.REMOTE_PROGRAMS_LIST_UPDATED:
		case $.PROGRAMS_LIST_UP_TO_DATE:
		case $.REMOTE_PROGRAMS_LIST_REMOVED: {
			return {
				...state,
				updating: false,
			};
		}
		case $.PROGRAMS_LIST_SYNCED: {
			// replace state
			return {
				updating: false,
				...action.payload,
			};
		}
		case $.UPDATE_LOCAL_PROGRAMS_LIST: {
			const { current, add, remove, dateUpdated } = action.payload;
			return {
				...state,
				dateUpdated,
				current,
				all: getUpdateAllList(state.all, add, remove),
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
