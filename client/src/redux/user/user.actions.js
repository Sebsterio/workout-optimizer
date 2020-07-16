import { userActionTypes as $ } from "./user.types";

export const userLoading = () => ({
	type: $.USER_LOADING,
});

export const userLoaded = (data) => ({
	type: $.USER_LOADED,
	payload: data,
});

export const authSuccess = (data) => ({
	type: $.AUTH_SUCCESS,
	payload: data,
});

export const skipAuth = () => ({
	type: $.SKIP_AUTH,
});

export const clearUserData = () => ({
	type: $.CLEAR_USER_DATA,
});
