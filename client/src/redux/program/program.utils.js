import {
	removeArrayItem,
	replaceArrayItem,
	duplicateArrayItem,
	moveArrayItem,
} from "utils/array";

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
