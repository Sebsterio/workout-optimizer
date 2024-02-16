import { errorActionTypes as $ } from "./error.types";

export const getError = (data) => {
	return {
		type: $.GET_ERROR,
		payload: data,
	};
};

export const clearError = () => {
	return {
		type: $.CLEAR_ERROR,
	};
};
