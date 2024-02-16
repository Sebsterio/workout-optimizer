import { standardProgramTemplate } from "state/programs/standardProgram";
import { duplicateArrayItem, moveArrayItem, removeArrayItem, replaceArrayItem } from "utils/array";

// --------------------------- Reducer -----------------------------

// --- Remove ---

export const getStateWithRemovedSavedProgram = (state, program) => ({
	...state,
	saved: getGroupWithRemovedProgram(state.saved, program),
});

export const getGroupWithRemovedProgram = (group, programToRemove) =>
	group.filter((program) => program.id !== programToRemove.id);

// --- Modify ---

export const getStateWithModifiedSavedProgram = (state, program, newProps) => ({
	...state,
	saved: getGroupWithModifiedProgram(state.saved, program, newProps),
});

export const getGroupWithModifiedProgram = (group, programToModify, newProps) =>
	group.map((program) =>
		program.id === programToModify.id ? { ...program, ...newProps } : program
	);

export const getModifiedFields = (fields, payload) => {
	const { fieldToAdd, fieldToReplace, fieldToDuplicate, fieldToDelete, fieldToMove } = payload;

	let newFields = [...fields];

	if (fieldToAdd) newFields = [fieldToAdd, ...fields];

	if (fieldToDelete) newFields = removeArrayItem(fields, fieldToDelete);

	if (fieldToDuplicate) {
		const modifier = (field) => ({ ...field, name: field.name + " (copy)" });
		newFields = duplicateArrayItem(fields, fieldToDuplicate, modifier);
	}

	if (fieldToReplace) {
		const { oldField, newField } = fieldToReplace;
		newFields = replaceArrayItem(newFields, oldField, newField);
	}

	if (fieldToMove) {
		const { field, direction } = fieldToMove;
		const steps = direction === "up" ? -1 : direction === "down" ? 1 : 0;
		newFields = moveArrayItem(newFields, field, steps);
	}

	return newFields;
};

// TODO: move to log redux
export const getFieldsWithNewMaxCustomRest = (fields, field, rest) =>
	fields.map((f) => {
		if (f === field && (!f.maxCustomRest || f.maxCustomRest < rest)) f.maxCustomRest = rest;
		return f;
	});

// -------------------------- Conversion -----------------------------

export const convertRemotePrograms = (programs) => {
	return programs.map((program) => convertRemoteProgram(program));
};

export const convertRemoteProgram = (program) => {
	if (program === "standard") return { ...standardProgramTemplate };
	return {
		...program,
		fields: JSON.parse(program.fields),
	};
};

export const convertLocalProgram = (program) => ({
	...program,
	fields: JSON.stringify(program.fields),
});
