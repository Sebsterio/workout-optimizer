import { programsActionTypes as $ } from "./programs.types";
import { getStateWithRemovedProgram } from "./programs.utils";

const INITIAL_STATE = {
	isDownloading: false,
	isUpdating: false,
	saved: [], // Present in user's programsList
	fetched: [], // Kept temporarily (not persisted)
};

const programsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		// ---------- Download remote programs ----------

		case $.DOWNLOADING_PROGRAMS: {
			return {
				...state,
				isDownloading: true,
			};
		}

		case $.PROGRAMS_DOWNLADED: {
			const { group, data } = action.payload;
			return {
				...state,
				isDownloading: false,
				[group]: [...data],
			};
		}

		case $.PROGRAMS_DOWNLAD_FAIL: {
			return {
				...state,
				isDownloading: false,
			};
		}

		// ---------- Update/remove remote program(s) ----------

		case $.UPDATING_REMOTE_PUBLIC_PROGRAM:
		case $.REMOVING_REMOTE_PROGRAM:
		case $.REMOVING_ALL_REMOTE_PRIVATE_PROGRAMS: {
			return {
				...state,
				isUpdating: true,
			};
		}

		case $.REMOTE_PUBLIC_PROGRAM_UPDATED:
		case $.REMOTE_PROGRAM_REMOVED:
		case $.ALL_REMOTE_PRIVATE_PROGRAMS_REMOVED: {
			return {
				...state,
				isUpdating: false,
			};
		}

		// ---------- Update local state ----------

		// Unshift program or move to front if already present
		case $.ADD_LOCAL_SAVED_PROGRAM: {
			const newProgram = action.payload;
			return {
				...state,
				saved: [
					newProgram,
					...getStateWithRemovedProgram(state.saved, newProgram),
				],
			};
		}

		case $.REMOVE_LOCAL_SAVED_PROGRAM: {
			return {
				...state,
				saved: getStateWithRemovedProgram(state.saved, action.payload),
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
