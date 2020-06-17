import axios from "axios";

import userActionTypes from "./user.types";
import { getError, clearError } from "../error/error.actions";
import {
	createRemoteLog,
	syncLog,
	clearLocalLog,
	removeRemoteLog,
} from "../log/log.actions";
import { getConfig, getTokenConfig } from "../utils";

const {
	USER_LOADED,
	USER_LOADING,
	AUTH_SUCCESS,
	SKIP_AUTH,
	CLEAR_USER_DATA,
} = userActionTypes;

// ---------------------- Basic --------------------------

const userLoading = () => ({
	type: USER_LOADING,
});

const userLoaded = (data) => ({
	type: USER_LOADED,
	payload: data,
});

export const authSuccess = (data) => ({
	type: AUTH_SUCCESS,
	payload: data,
});

export const skipAuth = () => ({
	type: SKIP_AUTH,
});

export const clearUserData = () => ({
	type: CLEAR_USER_DATA,
});

// ---------------------- Thunk --------------------------

// Register and get new token
export const register = (formData) => (dispatch) => {
	dispatch(clearError());
	axios
		.post("/api/auth/register", JSON.stringify(formData), getConfig())
		.then((res) => {
			dispatch(authSuccess(res.data));
			dispatch(createRemoteLog());
		})
		.catch((err) => {
			dispatch(getError(err, "REGISTER_FAIL"));
			dispatch(clearUserData());
		});
};

// Log in and get new token
export const login = (formData) => (dispatch) => {
	dispatch(clearError());
	axios
		.post("/api/auth/login", JSON.stringify(formData), getConfig())
		.then((res) => {
			dispatch(authSuccess(res.data));
			dispatch(syncLog());
		})
		.catch((err) => {
			dispatch(getError(err, "LOGIN_FAIL"));
			dispatch(clearUserData());
		});
};

export const closeAccount = (formData) => (dispatch, getState) => {
	dispatch(clearError());
	const token = getTokenConfig(getState);
	axios
		.post("api/auth/delete", JSON.stringify(formData), token)
		.then(() => dispatch(clearUserData()))
		.then(() => dispatch(removeRemoteLog(token)))
		.catch((err) => dispatch(getError(err, "CLOSE_ACCOUNT_FAIL")));
};

// Get user data using locally saved token
export const loadUser = () => (dispatch, getState) => {
	dispatch(userLoading());
	axios
		.get("/api/auth", getTokenConfig(getState))
		.then((res) => {
			dispatch(userLoaded(res.data));
			dispatch(syncLog());
		})
		.catch((err) => dispatch(clearUserData()));
};

export const logout = () => (dispatch) => {
	dispatch(clearUserData());
	dispatch(clearLocalLog());
};
