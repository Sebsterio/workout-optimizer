import modalActionTypes from "./modal.types";

const INITIAL_STATE = {
	isOpen: false,
	cellData: {},
};

const modalReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case modalActionTypes.OPEN_MODAL:
			return {
				cellData: action.payload,
				isOpen: true,
			};

		case modalActionTypes.CLOSE_MODAL:
			return {
				cellData: {},
				isOpen: false,
			};

		default:
			return state;
	}
};

export default modalReducer;
