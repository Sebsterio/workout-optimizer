import logActionTypes from "./log.types";
import { getStateWithAddedEntry, getStateWithRemovedEntry } from "./log.utils";

export const INITIAL_STATE = {
	dateUpdated: new Date(),
	entries: {
		// Mon_Jun_15_2020: {
		// 	quads: 1,
		// 	upperBack: 2,
		// 	chest: 3,
		// },
	},
};

const { LOG_SYNCED, ADD_ENTRY, REMOVE_ENTRY, CLEAR_LOG } = logActionTypes;

const logReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CLEAR_LOG: {
			return {
				...state,
				entries: {},
			};
		}
		case LOG_SYNCED: {
			return {
				...action.payload,
			};
		}
		case ADD_ENTRY: {
			return getStateWithAddedEntry(state, action.payload);
		}
		case REMOVE_ENTRY: {
			return getStateWithRemovedEntry(state, action.payload);
		}
		default:
			return state;
	}
};

export default logReducer;
