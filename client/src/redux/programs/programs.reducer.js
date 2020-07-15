import { programsActionTypes } from "./programs.types";
import { getFilteredArray, convertCurrentProgram } from "./programs.utils";

const {
	DOWNLOADING_PROGRAMS,
	PROGRAMS_DOWNLAD_SUCCESS,
	PROGRAMS_DOWNLAD_FAIL,
	ADD_PRIVATE_PROGRAM,
	REMOVE_PRIVATE_PROGRAM,
} = programsActionTypes;

const INITIAL_STATE = {
	downloading: false,
	private: [],
	public: [],
};

const programsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case DOWNLOADING_PROGRAMS: {
			return {
				...state,
				downloading: true,
			};
		}
		case PROGRAMS_DOWNLAD_SUCCESS: {
			return {
				...state,
				downloading: false,
				public: [...action.payload],
			};
		}
		case PROGRAMS_DOWNLAD_FAIL: {
			return {
				...state,
				downloading: false,
				public: [],
			};
		}
		case ADD_PRIVATE_PROGRAM: {
			const newProgram = convertCurrentProgram(action.payload);
			return {
				...state,
				private: [newProgram, ...state.private],
			};
		}
		case REMOVE_PRIVATE_PROGRAM: {
			return {
				...state,
				private: getFilteredArray(state.private, action.payload),
			};
		}

		default:
			return state;
	}
};

export default programsReducer;
