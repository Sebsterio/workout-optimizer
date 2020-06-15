import axios from "axios";

import userActionTypes from "./user.types";
import { getError } from "../error/error.actions";
import { getConfig, getTokenConfig } from "./user.utils";

const {
	USER_LOADED,
	USER_LOADING,
	AUTH_SUCCESS,
	AUTH_ERROR,
	SKIP_AUTH,
	LOGOUT_SUCCESS,
} = userActionTypes;

// ---------------------- Basic --------------------------

const userLoading = () => ({
	type: USER_LOADING,
});

const userLoaded = (data) => ({
	type: USER_LOADED,
	payload: data,
});

const authError = () => ({
	type: AUTH_ERROR,
});

export const authSuccess = (data) => ({
	type: AUTH_SUCCESS,
	payload: data,
});

export const skipAuth = () => ({
	type: SKIP_AUTH,
});

export const logout = () => ({
	type: LOGOUT_SUCCESS,
});

// ---------------------- Thunk --------------------------

// Get user data using locally saved token
export const loadUser = () => (dispatch, getState) => {
	dispatch(userLoading());
	axios
		.get("/api/auth/user", getTokenConfig(getState))
		.then((res) => dispatch(userLoaded(res.data)))
		.catch((err) => {
			const { data, status } = err.response;
			dispatch(getError(data, status, "AUTH_ERROR"));
			dispatch(authError());
		});

	// TODO: sync log with db - push newer to older
};

// Add new user and get new token
export const register = (formData) => (dispatch) => {
	const body = JSON.stringify(formData);
	axios
		.post("/api/auth/register", body, getConfig())
		.then((res) => dispatch(authSuccess(res.data)))
		.catch((err) => {
			const { data, status } = err.response;
			dispatch(getError(data, status, "REGISTER_FAIL"));
			dispatch(authError());
		});
};

// Log in and get new token
export const login = (formData) => (dispatch) => {
	const body = JSON.stringify(formData);
	axios
		.post("/api/auth/login", body, getConfig())
		.then((res) => dispatch(authSuccess(res.data)))
		.catch((err) => {
			const { data, status } = err.response;
			dispatch(getError(data, status, "LOGIN_FAIL"));
			dispatch(authError());
		});
};
