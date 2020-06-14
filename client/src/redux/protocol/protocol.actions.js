import protocolActionTypes from "./protocol.types";

const { GET_AREAS } = protocolActionTypes;

export const getAreas = () => ({
	type: GET_AREAS,
});
