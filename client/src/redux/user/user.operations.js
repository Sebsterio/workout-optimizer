import axios from "axios";

import {
	userLoading,
	userLoaded,
	authSuccess,
	clearUserData,
} from "./user.actions";
import { getError, clearError } from "redux/error/error.actions";
import {
	createRemoteLog,
	syncLog,
	removeRemoteLog,
} from "redux/log/log.operations";
import { clearLocalLog } from "redux/log/log.actions";
import {
	createRemoteProgram,
	syncCurrentProgram,
} from "redux/program/program.operations";
import { resetLocalCurrentProgram } from "redux/program/program.actions";
import { removeAllPrivatePrograms } from "redux/programs/programs.operations";
import { clearLocalPrograms } from "redux/programs/programs.actions";
import {
	createRemoteProgramsList,
	removeRemoteProgramsList,
} from "redux/programs-list/programs-list.operations";

import { getConfig, getTokenConfig } from "../utils";

// -------------------------------------------------------------------

// Register and get new token
export const register = (formData) => (dispatch, getState) => {
	dispatch(clearError());
	axios
		.post("/api/auth/register", JSON.stringify(formData), getConfig())
		.then((res) => dispatch(authSuccess(res.data)))
		.then(() => dispatch(createRemoteLog()))
		.then(() => dispatch(createRemoteProgramsList()))
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
		.then(() => dispatch(syncCurrentProgram()))
		.catch((err) => {
			dispatch(getError(err, "LOGIN_FAIL"));
			dispatch(clearUserData());
		});
};

// Get user data using a locally saved token
export const loadUser = () => (dispatch, getState) => {
	dispatch(userLoading());
	axios
		.get("/api/auth", getTokenConfig(getState))
		.then((res) => dispatch(userLoaded(res.data)))
		.then(() => dispatch(syncLog()))
		.then(() => dispatch(syncCurrentProgram()))
		// NOTE: don't getError - causes redundant alert
		.catch((err) => dispatch(clearUserData()));
};

// Clear store
export const logout = () => (dispatch) => {
	dispatch(clearUserData());
	dispatch(clearLocalLog());
	dispatch(resetLocalCurrentProgram());
	dispatch(clearLocalPrograms());
};

// Remove all user data from db
export const closeAccount = (formData) => (dispatch, getState) => {
	dispatch(clearError());
	const token = getTokenConfig(getState);
	dispatch(removeRemoteLog(token));
	dispatch(removeRemoteProgramsList(token));
	dispatch(removeAllPrivatePrograms(token)); // <<<< change
	axios
		.post("api/auth/delete", JSON.stringify(formData), token)
		.then(() => {
			dispatch(logout());
			localStorage.clear();
		})
		.catch((err) => dispatch(getError(err, "CLOSE_ACCOUNT_FAIL")));
};
