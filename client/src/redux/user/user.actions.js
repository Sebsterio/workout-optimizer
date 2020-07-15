import axios from "axios";

import userActionTypes from "./user.types";
import { getError, clearError } from "redux/error/error.actions";
import {
	createRemoteLog,
	syncLog,
	clearLocalLog,
	removeRemoteLog,
} from "redux/log/log.actions";
import {
	createRemoteProgram,
	syncProgram,
	resetLocalProgram,
} from "redux/program/program.actions";
import {
	removeAllPrograms,
	clearLocalPrograms,
} from "redux/programs/programs.actions";
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
export const register = (formData) => (dispatch, getState) => {
	dispatch(clearError());
	axios
		.post("/api/auth/register", JSON.stringify(formData), getConfig())
		.then((res) => dispatch(authSuccess(res.data)))
		.then(() => dispatch(createRemoteLog()))
		.then(() => {
			// create remoteProgram if localProgram has been modified
			const { isPublished } = getState().program;
			if (!isPublished) dispatch(createRemoteProgram());
		})
		.catch((err) => {
			dispatch(getError(err, "REGISTER_FAIL"));
			dispatch(clearUserData());
		});
};

// Log in and get new token
export const login = (formData) => (dispatch) => {
	dispatch(clearError());
	dispatch(userLoading());
	axios
		.post("/api/auth/login", JSON.stringify(formData), getConfig())
		.then((res) => dispatch(authSuccess(res.data)))
		.then(() => dispatch(syncLog()))
		.then(() => dispatch(syncProgram()))
		.catch((err) => {
			dispatch(getError(err, "LOGIN_FAIL"));
			dispatch(clearUserData());
		});
};

// Get user data using locally saved token
export const loadUser = () => (dispatch, getState) => {
	dispatch(userLoading());
	axios
		.get("/api/auth", getTokenConfig(getState))
		.then((res) => dispatch(userLoaded(res.data)))
		.then(() => dispatch(syncLog()))
		.then(() => dispatch(syncProgram()))
		// NOTE: don't getError - causes redundant alert
		.catch((err) => dispatch(clearUserData()));
};

export const logout = () => (dispatch) => {
	dispatch(clearUserData());
	dispatch(clearLocalLog());
	dispatch(resetLocalProgram());
	dispatch(clearLocalPrograms());
};

export const closeAccount = (formData) => (dispatch, getState) => {
	dispatch(clearError());
	const token = getTokenConfig(getState);
	axios
		.post("api/auth/delete", JSON.stringify(formData), token)
		.then(() => {
			dispatch(logout());
			dispatch(removeRemoteLog(token));
			dispatch(removeAllPrograms(token)); // <<<< change
		})
		.then(() => localStorage.clear())
		.catch((err) => dispatch(getError(err, "CLOSE_ACCOUNT_FAIL")));
};
