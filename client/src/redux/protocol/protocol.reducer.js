// import protocolActionTypes from "./protocol.types";
import { INITIAL_STATE } from "./protocol.initialState";

const protocolReducer = (state = INITIAL_STATE, action) => {
	//
	console.log("Protocol initial state: ", INITIAL_STATE);
	//
	switch (action.type) {
		default:
			return state;
	}
};

export default protocolReducer;
