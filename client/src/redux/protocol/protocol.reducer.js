import protocolActionTypes from "./protocol.types";
import { INITIAL_STATE } from "./protocol.initialState";
import { getNewFields, getFieldsWithNewMaxCustomRest } from "./protocol.utils";

const { UPDATE_MAX_CUSTOM_REST, UPDATE_LOCAL_PROTOCOL } = protocolActionTypes;

const protocolReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UPDATE_MAX_CUSTOM_REST:
			return {
				...state,
				fields: getFieldsWithNewMaxCustomRest(state, action.payload),
			};

		case UPDATE_LOCAL_PROTOCOL:
			return {
				...state,
				dateUpdated: action.payload.dateUpdated,
				fields: getNewFields(state, action.payload),
			};
		default:
			return state;
	}
};

export default protocolReducer;
