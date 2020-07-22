import axios from "axios";

// user
import * as $ from "./user.actions";

// error
import { getError, clearError } from "redux/error/error.actions";

// log
import {
	createRemoteLog,
	syncLog,
	removeRemoteLog,
} from "redux/log/log.operations";
import { clearLocalLog } from "redux/log/log.actions";

// programs
import {
	updateRemotePrograms,
	syncPrograms,
	removeAllRemotePrivatePrograms,
} from "redux/programs/programs.operations";
import {
	setCurrentStandardProgram,
	clearLocalPrograms,
} from "redux/programs/programs.actions";

// programs-list
import {
	createRemoteProgramsList,
	removeRemoteProgramsList,
} from "redux/programs-list/programs-list.operations";
import { clearLocalProgramsList } from "redux/programs-list/programs-list.actions";

// other
import { getConfig, getTokenConfig } from "../utils";

// ------------------------ loadUser ------------------------------

// Get user data using a locally saved token
// If not registered, fresh start
export const loadUser = () => (dispatch, getState) => {
	dispatch($.userLoading());
	const token = getTokenConfig(getState);
	axios
		.get("/api/auth", token)
		.then((res) => {
			dispatch($.userLoaded(res.data));
			dispatch(syncLog());
			dispatch(syncPrograms());
		})
		// NOTE: Don't getError (causes redundant alert on startup)
		.catch(() => {
			dispatch($.loadUserFail());

			// On first run (persistor empty) load standardProgram
			const currentProgram = getState().programs.saved[0];
			const firstRun = !currentProgram.id;
			if (firstRun) dispatch(setCurrentStandardProgram());
		});
};

// ------------------------ register ------------------------------

// Create user db collection; get new token; create other db collections
export const register = (formData) => (dispatch) => {
	dispatch(clearError());
	dispatch($.userLoading());
	axios
		.post("/api/auth/register", JSON.stringify(formData), getConfig())
		.then((res) => {
			dispatch($.authSuccess(res.data));
			dispatch(createRemoteLog());
			return dispatch(createRemoteProgramsList()); // blocking
		})
		.then(() => dispatch(updateRemotePrograms()))
		.catch((err) => {
			dispatch(getError(err, "REGISTER_FAIL"));
			dispatch($.clearUserData());
		});
};

// -------------------------- login ------------------------------

// Get new token and sync store
export const login = (formData) => (dispatch) => {
	dispatch(clearError());
	dispatch($.userLoading());
	axios
		.post("/api/auth/login", JSON.stringify(formData), getConfig())
		.then((res) => {
			dispatch($.authSuccess(res.data));
			dispatch(syncLog());
			dispatch(syncPrograms());
		})
		.catch((err) => {
			dispatch(getError(err, "LOGIN_FAIL"));
			dispatch($.clearUserData());
		});
};

// -------------------------- logout ------------------------------

// Clear store and persistor; fresh start
export const logout = () => (dispatch) => {
	dispatch($.clearUserData());
	dispatch(clearLocalLog());
	dispatch(clearLocalPrograms());
	dispatch(clearLocalProgramsList());
	dispatch(setCurrentStandardProgram());
	localStorage.clear();
};

// ----------------------- closeAccount ----------------------------

// Remove all user data from db
export const closeAccount = (formData) => (dispatch, getState) => {
	dispatch(clearError());
	const token = getTokenConfig(getState);
	dispatch(removeRemoteLog(token));
	dispatch(removeRemoteProgramsList(token));
	dispatch(removeAllRemotePrivatePrograms(token));
	axios
		.post("api/auth/delete", JSON.stringify(formData), token)
		.then(() => dispatch(logout()))
		.catch((err) => dispatch(getError(err, "CLOSE_ACCOUNT_FAIL")));
};
