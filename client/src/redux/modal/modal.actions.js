import modalActionTypes from "./modal.types";
const { OPEN_MODAL, CLOSE_MODAL } = modalActionTypes;

export const openModal = (data) => ({
	type: OPEN_MODAL,
	payload: data,
});

export const closeModal = () => ({
	type: CLOSE_MODAL,
});
