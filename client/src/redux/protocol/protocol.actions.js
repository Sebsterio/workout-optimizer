import protocolActionTypes from "./protocol.types";

const { GET_FIELDS } = protocolActionTypes;

export const getFields = () => ({
	type: GET_FIELDS,
});
