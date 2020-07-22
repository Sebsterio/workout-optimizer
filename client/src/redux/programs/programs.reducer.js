import { programsActionTypes as $ } from "./programs.types";
import {
	getStateWithModifiedSavedProgram,
	getStateWithRemovedSavedProgram,
	getGroupWithRemovedProgram,
	getModifiedFields,
	getFieldsWithNewMaxCustomRest,
} from "./programs.utils";
import { standardProgramTemplate } from "./standardProgram";

const INITIAL_STATE = {
	// Local; persisted
	downloading: false,
	updating: false,
	dateModified: new Date(),

	// ID of currently edited program
	editing: null,

	// Synced as a list (IDs) and individually (data); persisted
	// first item == current-program
	saved: [
		{
			isUpdating: false,
			isUpdated: false,
			isPublishing: false,
			isPublished: false, // does a public copy exist
			isPublic: false, // is this a public copy

			id: null,
			dateModified: null,
			name: "",
			description: "",
			fields: [],
		},
	],

	// Local; not persisted
	fetched: [],
};

const programsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		/********************************************************
												Remote Collection
		********************************************************/

		// ------------ Download remote collection -------------

		case $.DOWNLOADING_PROGRAMS: {
			return {
				...state,
				downloading: true,
			};
		}

		case $.PROGRAMS_DOWNLADED:
		case $.PROGRAMS_DOWNLAD_FAIL:
		case $.PROGRAMS_UP_TO_DATE: {
			return {
				...state,
				downloading: false,
			};
		}

		// ------------- Remove remote collection ---------------

		case $.REMOVING_ALL_REMOTE_PRIVATE_PROGRAMS: {
			return {
				...state,
				updating: true,
			};
		}

		case $.ALL_REMOTE_PRIVATE_PROGRAMS_REMOVED: {
			return {
				...state,
				updating: false,
			};
		}

		/********************************************************
												Local Collection
		********************************************************/

		// --------------- Modify local collection ---------------

		// Replace all program in a group
		case $.REPLACE_COLLECTION: {
			const { group, data } = action.payload;
			return {
				...state,
				[group]: [...data],
			};
		}

		// Add/Move program to near-front of saved programs array (behind current)
		case $.ADD_LOCAL_SAVED_PROGRAM: {
			const newProgram = action.payload;
			const savedPrograms = getGroupWithRemovedProgram(state.saved, newProgram);
			const currentProgram = savedPrograms.splice(0, 1)[0];
			return {
				...state,
				saved: [currentProgram, newProgram, ...savedPrograms],
			};
		}

		case $.REMOVE_LOCAL_SAVED_PROGRAM: {
			const program = action.payload;
			return getStateWithRemovedSavedProgram(state, program);
		}

		// Add/Move program to front of saved programs array
		case $.SET_CURRENT_PROGRAM: {
			const newCurrentProgram = action.payload;
			const savedPrograms = getGroupWithRemovedProgram(
				state.saved,
				newCurrentProgram
			);
			return {
				...state,
				saved: [newCurrentProgram, ...savedPrograms],
			};
		}

		// Add standard program as the only item in programs array
		case $.SET_CURRENT_STANDARD_PROGRAM: {
			const standardProgram = { ...standardProgramTemplate };
			return {
				...state,
				saved: [standardProgram],
			};
		}

		case $.SET_EDITED_PROGRAM: {
			return {
				...state,
				editing: action.payload,
			};
		}

		// --------------- Remove local collection ---------------

		// Clear group
		case $.CLEAR_LOCAL_PROGRAMS_GROUP: {
			const { group } = action.payload;
			return {
				...state,
				[group]: [],
			};
		}

		// Clear state
		case $.CLEAR_LOCAL_PROGRAMS: {
			return INITIAL_STATE;
		}

		/***********************************************************
											Remote individual program
		************************************************************/

		// ---------- Create/update/remove remote program ------------

		case $.CREATING_REMOTE_PROGRAM:
		case $.UPDATING_REMOTE_PROGRAM:
		case $.REMOVING_REMOTE_PROGRAM: {
			const program = action.payload;
			const newProps = {
				isUpdating: true,
				isUpdated: false,
			};
			return getStateWithModifiedSavedProgram(state, program, newProps);
		}

		case $.REMOTE_PROGRAM_CREATED:
		case $.REMOTE_PROGRAM_UPDATED:
		case $.REMOTE_PROGRAM_REMOVED: {
			const program = action.payload;
			const newProps = {
				isUpdating: false,
				isUpdated: true,
			};
			return getStateWithModifiedSavedProgram(state, program, newProps);
		}

		case $.REMOTE_PROGRAM_CREATE_FAIL:
		case $.REMOTE_PROGRAM_UPDATE_FAIL: {
			const program = action.payload;
			const newProps = {
				isUpdating: false,
				isUpdated: false,
			};
			return getStateWithModifiedSavedProgram(state, program, newProps);
		}

		/***********************************************************
											Local individual program
		************************************************************/

		//  -------------- Publish local program ---------------

		case $.PUBLISHING_PROGRAM: {
			const program = action.payload;
			const newProps = {
				isPublishing: true,
				isPublished: false,
			};
			return getStateWithModifiedSavedProgram(state, program, newProps);
		}

		case $.PROGRAM_PUBLISHED: {
			const program = action.payload;
			const newProps = {
				isPublishing: false,
				isPublished: true,
			};
			return getStateWithModifiedSavedProgram(state, program, newProps);
		}

		case $.PROGRAM_PUBLISH_FAIL: {
			const program = action.payload;
			const newProps = {
				isPublishing: false,
				isPublished: false,
			};
			return getStateWithModifiedSavedProgram(state, program, newProps);
		}

		//  --------------- Modify local program ---------------

		case $.MODIFY_LOCAL_SAVED_PROGRAM: {
			const { program, replaceProps } = action.payload;
			const { fields } = program;
			const newProps = {
				fields: getModifiedFields(fields, action.payload),
				...replaceProps, // last (overwrite rest)
			};
			return getStateWithModifiedSavedProgram(state, program, newProps);
		}

		// Modify maxCustomRest prop of a field of currentProgram
		// TODO: don't sync custom rest
		// TODO: move feature to log redux
		case $.MODIFY_MAX_CUSTOM_REST:
			const program = state.saved[0];
			const { fields } = program;
			const { field, rest } = action.payload;

			if (!rest) return state;
			const newProps = {
				fields: getFieldsWithNewMaxCustomRest(fields, field, rest),
			};
			return getStateWithModifiedSavedProgram(state, program, newProps);

		default:
			return state;
	}
};

export default programsReducer;
