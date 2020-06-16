import errorActionTypes from "./error.types";

const { GET_ERROR, CLEAR_ERROR } = errorActionTypes;

const INITIAL_STATE = {
	msg: "",
	status: null,
	id: null,
};

const errorReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_ERROR: {
			const { response } = action.payload;
			if (response) return { ...response };
			else
				return {
					msg: action.payload,
					status: null,
					id: "UNKNOWN_ERROR",
				};
		}
		case CLEAR_ERROR: {
			return {
				msg: "",
				status: null,
				id: null,
			};
		}
		default:
			return state;
	}
};

export default errorReducer;
