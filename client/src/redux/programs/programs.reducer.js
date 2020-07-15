import { programsActionTypes } from "./programs.types";
import { getFilteredArray, getUpdatedArray } from "./programs.utils";

const {
	DOWNLOADING_PROGRAMS,
	PROGRAMS_DOWNLAD_SUCCESS,
	PROGRAMS_DOWNLAD_FAIL,
	ADD_PRIVATE_PROGRAM,
	UPDATE_PRIVATE_PROGRAM,
	REMOVE_LOCAL_PRIVATE_PROGRAM,
	REMOVING_REMOTE_PROGRAM,
	REMOTE_PROGRAM_REMOVED,
	CLEAR_LOCAL_PROGRAMS,
} = programsActionTypes;

const INITIAL_STATE = {
	downloading: false,
	updating: false,
	private: [],
	public: [],
};

const programsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case REMOVING_REMOTE_PROGRAM: {
			return {
				...state,
				updating: true,
			};
		}
		case REMOTE_PROGRAM_REMOVED: {
			return {
				...state,
				updating: false,
			};
		}
		case DOWNLOADING_PROGRAMS: {
			return {
				...state,
				downloading: true,
			};
		}
		case PROGRAMS_DOWNLAD_SUCCESS: {
			const { group, data } = action.payload;
			return {
				...state,
				downloading: false,
				[group]: [...data],
			};
		}
		case PROGRAMS_DOWNLAD_FAIL: {
			const { group } = action.payload;
			return {
				...state,
				downloading: false,
				[group]: [],
			};
		}
		// Unshift program or move to front if already present
		case ADD_PRIVATE_PROGRAM: {
			const newProgram = action.payload;
			if (!newProgram) return state;
			return {
				...state,
				private: [newProgram, ...getFilteredArray(state.private, newProgram)],
			};
		}
		case UPDATE_PRIVATE_PROGRAM: {
			return {
				...state,
				private: [...getUpdatedArray(state.private, action.payload)],
			};
		}
		case REMOVE_LOCAL_PRIVATE_PROGRAM: {
			return {
				...state,
				private: [...getFilteredArray(state.private, action.payload)],
			};
		}

		case CLEAR_LOCAL_PROGRAMS: {
			return INITIAL_STATE;
		}

		default:
			return state;
	}
};

export default programsReducer;
