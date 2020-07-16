import { modalActionTypes as $ } from "./modal.types";

const INITIAL_STATE = {
	isOpen: false,
	isPickingDate: false,
	cellData: {},
};

const modalReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case $.OPEN_MODAL:
			return {
				cellData: action.payload,
				isOpen: true,
				isPickingDate: false,
			};

		case $.CLOSE_MODAL:
			return {
				cellData: {},
				isOpen: false,
				isPickingDate: false,
			};

		// Close modal preserving cellData
		case $.PICK_DATE:
			console.log("pickDate in reducer");
			return {
				...state,
				isPickingDate: true,
				isOpen: false,
			};

		// Open modal replacing cellData.dateStr
		case $.DATE_PICKED: {
			const { field, dateStr } = action.payload;
			return {
				isOpen: true,
				isPickingDate: false,
				cellData: {
					...state.cellData,
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
