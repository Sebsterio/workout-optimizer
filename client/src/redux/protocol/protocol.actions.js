import protocolActionTypes from "./protocol.types";

const { GET_FIELDS, UPDATE_MAX_CUSTOM_REST } = protocolActionTypes;

export const getFields = () => ({
	type: GET_FIELDS,
});

export const updateMaxCustomRest = (data) => ({
	type: UPDATE_MAX_CUSTOM_REST,
	payload: data,
});
