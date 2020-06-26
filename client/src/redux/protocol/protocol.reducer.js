import protocolActionTypes from "./protocol.types";
import { INITIAL_STATE } from "./protocol.initialState";
import { getFieldsWithNewMaxCustomRest } from "./protocol.utils";

const { UPDATE_MAX_CUSTOM_REST } = protocolActionTypes;

const protocolReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UPDATE_MAX_CUSTOM_REST:
			return {
				...state,
				fields: getFieldsWithNewMaxCustomRest(state, action.payload),
			};

		default:
			return state;
	}
};

export default protocolReducer;
