import protocolActionTypes from "./protocol.types";

const {
	GET_FIELDS,
	UPDATE_MAX_CUSTOM_REST,
	UPDATE_LOCAL_PROTOCOL,
} = protocolActionTypes;

export const getFields = () => ({
	type: GET_FIELDS,
});

export const updateMaxCustomRest = (data) => ({
	type: UPDATE_MAX_CUSTOM_REST,
	payload: data,
});

export const updateLocalProtocol = (data) => ({
	type: UPDATE_LOCAL_PROTOCOL,
	payload: data,
});

export const updateProtocol = (data) => (dispatch) => {
	const dateUpdated = new Date();
	dispatch(updateLocalProtocol({ ...data, dateUpdated }));

	// if (getState().user.isIncognito) return;
	// else update DB
};
