import errorActionTypes from "./error.types";

const { GET_ERROR, CLEAR_ERROR } = errorActionTypes;

export const getError = (data) => {
	return {
		type: GET_ERROR,
		payload: data,
	};
};

export const clearError = () => {
	return {
		type: CLEAR_ERROR,
	};
};
