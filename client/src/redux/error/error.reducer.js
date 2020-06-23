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
			const { response, message } = action.payload;
			if (response)
				return {
					msg: response.data.msg,
					status: response.status,
					id: response.id,
				};
			else if (message) {
				return {
					msg: message,
					status: null,
					id: "UNKNOWN_ERROR",
				};
			} else
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
