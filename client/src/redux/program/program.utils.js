import {
	replaceArrayItem,
	deleteArrayItem,
	duplicateArrayItem,
	moveArrayItem,
} from "utils/array";

// ------------------------------- Update -------------------------------

export const getFieldsWithNewMaxCustomRest = (state, payload) => {
	const { field, rest } = payload;
	if (!rest) return state.fields;

	return state.fields.map((f) => {
		if (f === field) {
			if (!f.maxCustomRest || f.maxCustomRest < rest) f.maxCustomRest = rest;
		}
		return f;
	});
};

export const getUpdatedFields = (fields, payload) => {
	const {
		fieldToAdd,
		fieldToReplace,
		fieldToDuplicate,
		fieldToDelete,
		fieldToMove,
	} = payload;

	let newFields = [...fields];

	if (fieldToAdd) newFields = [fieldToAdd, ...fields];

	if (fieldToDelete) newFields = deleteArrayItem(fields, fieldToDelete);

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

// ---------------------------- Conversion ------------------------------

export const getConvertedLocalCurrentProgram = (getState) =>
	convertLocalProgram(getState().program);

export const convertLocalProgram = (program) => ({
	...program,
	fields: JSON.stringify(program.fields),
});

export const convertRemoteProgram = (program) => {
	const newProgram = {
		...program,
		fields: JSON.parse(program.fields),
	};
	return newProgram;
};
