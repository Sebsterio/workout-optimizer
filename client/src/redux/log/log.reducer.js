import { INITIAL_STATE } from "./log.initialState";
import logActionTypes from "./log.types";
import { getStateWithAddedLog, getStateWithRemovedLog } from "./log.utils";

const logReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case logActionTypes.ADD_LOG: {
			return getStateWithAddedLog(state, action.payload);
		}
		case logActionTypes.REMOVE_LOG: {
			return getStateWithRemovedLog(state, action.payload);
		}
		default:
			return state;
	}
};

export default logReducer;
