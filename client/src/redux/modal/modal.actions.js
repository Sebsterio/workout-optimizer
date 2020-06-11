import modalActionTypes from "./modal.types";

export const openModal = (data) => ({
	type: modalActionTypes.OPEN_MODAL,
	payload: data,
});

export const closeModal = () => ({
	type: modalActionTypes.CLOSE_MODAL,
});
