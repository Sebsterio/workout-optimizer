import { modalActionTypes as $ } from "./modal.types";

const INITIAL_STATE = {
	isOpen: false, // needed for pickDate
	isPickingDate: false,
	mode: null,
	data: {},
};

const modalReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case $.OPEN_MODAL:
			return {
				...state,
				isOpen: true,
				...action.payload,
			};

		case $.CLOSE_MODAL:
			return {
				...state,
				isOpen: false,
				data: {},
				mode: null,
			};

		// Close modal preserving data
		case $.PICK_DATE:
			return {
				...state,
				isPickingDate: true,
				isOpen: false,
			};

		// Open modal replacing data
		case $.DATE_PICKED: {
			const { field, dateStr } = action.payload;
			return {
				...state,
				isOpen: true,
				isPickingDate: false,
				data: {
					...state.data,
					dateStr,
					field,
				},
			};
		}

		default:
			return state;
	}
};

export default modalReducer;
