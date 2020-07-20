import { userActionTypes as $ } from "./user.types";

const INITIAL_STATE = {
	token: null,
	name: null,
	id: null,
	isLoading: false,
	isAuthenticated: false,
	isIncognito: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case $.SKIP_AUTH:
			return {
				...state,
				isIncognito: true,
			};

		case $.USER_LOADING:
			return {
				...state,
				isLoading: true,
			};

		case $.USER_LOADED:
			return {
				...state,
				isIncognito: false,
				isLoading: false,
				isAuthenticated: true,
				...action.payload,
			};

		case $.LOAD_USER_FAIL:
			return {
				...state,
				isLoading: false,
			};

		case $.AUTH_SUCCESS:
			return {
				...state,
				isIncognito: false,
				isLoading: false,
				isAuthenticated: true,
				...action.payload,
			};

		case $.CLEAR_USER_DATA:
			return {
				...INITIAL_STATE,
			};
		default:
			return state;
	}
};

export default userReducer;
