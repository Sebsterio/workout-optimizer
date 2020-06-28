import modalActionTypes from "./modal.types";

export const openModal = (data) => ({
	type: modalActionTypes.OPEN_MODAL,
	payload: data,
});

export const closeModal = () => ({
	type: modalActionTypes.CLOSE_MODAL,
});

export const pickDate = () => ({
	type: modalActionTypes.PICK_DATE,
});

export const datePicked = (data) => ({
	type: modalActionTypes.DATE_PICKED,
	payload: data,
});
