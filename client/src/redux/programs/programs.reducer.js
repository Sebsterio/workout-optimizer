import { programsActionTypes } from "./programs.types";
import { getFilteredArray } from "./programs.utils";

const {
	// multiple
	DOWNLOADING_PROGRAMS,
	PROGRAMS_DOWNLAD_SUCCESS,
	PROGRAMS_DOWNLAD_FAIL,
	REMOVING_ALL_REMOTE_PROGRAMS,
	ALL_REMOTE_PROGRAMS_REMOVED,
	CLEAR_LOCAL_PROGRAMS,
	// single
	ADD_PRIVATE_PROGRAM,
	REMOVE_LOCAL_PRIVATE_PROGRAM,
	REMOVING_REMOTE_PROGRAM,
	REMOTE_PROGRAM_REMOVED,
} = programsActionTypes;

const INITIAL_STATE = {
	downloading: false,
	updating: false,
	private: [],
	public: [],
};

const programsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case REMOVING_REMOTE_PROGRAM:
		case REMOVING_ALL_REMOTE_PROGRAMS: {
			return {
				...state,
				updating: true,
			};
		}
		case REMOTE_PROGRAM_REMOVED:
		case ALL_REMOTE_PROGRAMS_REMOVED: {
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
			if (!newProgram || !newProgram.name) return state;
			return {
				...state,
				private: [newProgram, ...getFilteredArray(state.private, newProgram)],
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
