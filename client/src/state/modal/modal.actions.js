import { modalActionTypes as $ } from "./modal.types";

export const openModal = (data) => ({
	type: $.OPEN_MODAL,
	payload: data,
});

export const closeModal = () => ({
	type: $.CLOSE_MODAL,
});

export const pickDate = () => ({
	type: $.PICK_DATE,
});

export const datePicked = (data) => ({
	type: $.DATE_PICKED,
	payload: data,
});
