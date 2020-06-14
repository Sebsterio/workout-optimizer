import userActionTypes from "./user.types";

const {
	USER_LOADED,
	USER_LOADING,
	AUTH_SUCCESS,
	AUTH_ERROR,
	SKIP_AUTH,
	LOGOUT_SUCCESS,
} = userActionTypes;

const INITIAL_STATE = {
	token: localStorage.getItem("token"),
	isLoading: false,
	isAuthenticated: false,
	isLocal: false,
	data: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SKIP_AUTH:
			return {
				...state,
				isLocal: true,
			};
		case USER_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case USER_LOADED:
			return {
				...state,
				isLoading: false,
				isLocal: false,
				isAuthenticated: true,
				data: action.payload,
			};
		case AUTH_SUCCESS:
			localStorage.setItem("token", action.payload.token);
			return {
				...state,
				isLoading: false,
				isLocal: false,
				isAuthenticated: true,
				data: action.payload,
			};
		case AUTH_ERROR:
		case LOGOUT_SUCCESS:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				data: null,
				isAuthenticated: false,
				isLoading: false,
			};
		default:
			return state;
	}
};

export default userReducer;
