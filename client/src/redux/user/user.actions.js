import axios from "axios";

import userActionTypes from "./user.types";
import { getError, clearError } from "../error/error.actions";
import { createLog } from "../log/log.actions";
import { getConfig, getTokenConfig } from "../utils";
import { syncLog, clearLog } from "../log/log.actions";

const {
	USER_LOADED,
	USER_LOADING,
	AUTH_SUCCESS,
	AUTH_ERROR,
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

export const clearUserData = () => ({
	type: CLEAR_USER_DATA,
});

// ---------------------- Thunk --------------------------

export const logout = () => (dispatch) => {
	dispatch(clearLog());
	dispatch(clearUserData());
};

// Get user data using locally saved token
export const loadUser = () => (dispatch, getState) => {
	dispatch(clearError());
	dispatch(userLoading());
	axios
		.get("/api/auth/user", getTokenConfig(getState))
		.then((res) => {
			dispatch(userLoaded(res.data));

			// TODO: sync log if remote is more recent than local
		})
		.catch((err) => {
			const { data, status } = err.response;
			dispatch(getError(data, status, "AUTH_ERROR"));
			dispatch(authError());
		});
};

// Register and get new token
export const register = (formData) => (dispatch) => {
	dispatch(clearError());
	axios
		.post("/api/auth/register", JSON.stringify(formData), getConfig())
		.then((res) => {
			dispatch(authSuccess(res.data));
			dispatch(createLog(res.data));
		})
		.catch((err) => {
			const { data, status } = err.response;
			dispatch(getError(data, status, "REGISTER_FAIL"));
			dispatch(authError());
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
			const { data, status } = err.response;
			dispatch(getError(data, status, "LOGIN_FAIL"));
			dispatch(authError());
		});
};
