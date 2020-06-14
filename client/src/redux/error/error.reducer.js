import errorActionTypes from "./error.types";

const { GET_ERROR, CLEAR_ERROR } = errorActionTypes;

const INITIAL_STATE = {
	msg: "",
	status: null,
	id: null,
};

const errorReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_ERROR:
			const { msg, status, id } = action.payload;
			return { msg, status, id };

		case CLEAR_ERROR:
			return {
				msg: "",
				status: null,
				id: null,
			};
		default:
			return state;
	}
};

export default errorReducer;
