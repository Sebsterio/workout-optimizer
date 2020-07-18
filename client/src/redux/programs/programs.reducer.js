import { programsActionTypes as $ } from "./programs.types";
import { getFilteredArray } from "./programs.utils";

const INITIAL_STATE = {
	downloading: false,
	updating: false,
	saved: [], // Present in user's programsList
	fetched: [], // Kept temporarily (not persisted)
};

const programsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		// ---------- Download remote programs ----------

		case $.DOWNLOADING_PROGRAMS: {
			return {
				...state,
				downloading: true,
			};
		}
		case $.PROGRAMS_DOWNLADED: {
			const { group, data } = action.payload;
			return {
				...state,
				downloading: false,
				[group]: [...data],
			};
		}
		case $.PROGRAMS_DOWNLAD_FAIL: {
			return {
				...state,
				downloading: false,
			};
		}

		// ---------- Update/remove remote program(s) ----------

		case $.REMOVING_REMOTE_PROGRAM:
		case $.REMOVING_ALL_REMOTE_PRIVATE_PROGRAMS:
		case $.UPDATING_REMOTE_PUBLIC_PROGRAM: {
			return {
				...state,
				updating: true,
			};
		}
		case $.REMOTE_PROGRAM_REMOVED:
		case $.ALL_REMOTE_PRIVATE_PROGRAMS_REMOVED:
		case $.REMOTE_PUBLIC_PROGRAM_UPDATED: {
			return {
				...state,
				updating: false,
			};
		}

		// ---------- Update/remove local program(s) ----------

		// Unshift program or move to front if already present
		case $.ADD_SAVED_PROGRAM: {
			const newProgram = action.payload;
			if (!newProgram || !newProgram.name) return state;
			return {
				...state,
				saved: [newProgram, ...getFilteredArray(state.saved, newProgram)],
			};
		}
		case $.REMOVE_LOCAL_SAVED_PROGRAM: {
			return {
				...state,
				saved: [...getFilteredArray(state.saved, action.payload)],
			};
		}
		case $.CLEAR_LOCAL_PROGRAMS: {
			return INITIAL_STATE;
		}

		default:
			return state;
	}
};

export default programsReducer;
