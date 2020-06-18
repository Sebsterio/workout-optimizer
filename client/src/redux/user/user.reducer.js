import userActionTypes from "./user.types";

const {
	USER_LOADED,
	USER_LOADING,
	AUTH_SUCCESS,
	SKIP_AUTH,
	CLEAR_USER_DATA,
} = userActionTypes;

const INITIAL_STATE = {
	token: null,
	isIncognito: false,
	isLoading: false,
	isAuthenticated: false,
	name: null,
	_id: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SKIP_AUTH:
			return {
				...state,
				isIncognito: true,
			};
		case USER_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case USER_LOADED:
			return {
				...state,
				isIncognito: false,
				isLoading: false,
				isAuthenticated: true,
				...action.payload,
			};
		case AUTH_SUCCESS:
			// localStorage.setItem("token", action.payload.token);
			return {
				...state,
				isIncognito: false,
				isLoading: false,
				isAuthenticated: true,
				...action.payload,
			};
		case CLEAR_USER_DATA:
			// localStorage.removeItem("token");
			return {
				isIncognito: false,
				isLoading: false,
				isAuthenticated: false,
				name: null,
				_id: null,
				token: null,
			};
		default:
			return state;
	}
};

export default userReducer;
