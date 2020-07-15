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

export const getUpdatedFields = (state, payload) => {
	const { mode, field, newFieldData, direction } = payload;

	if (mode === "replace-field") {
		return state.fields.map((f) => {
			if (f === field) return { ...newFieldData };
			return f;
		});
	}

	if (mode === "delete-field") {
		return state.fields.filter((f) => f !== field);
	}

	if (mode === "duplicate-field") {
		const index = state.fields.indexOf(field);
		const newField = {
			...field,
			name: field.name + " (copy)",
		};
		const newFields = [...state.fields];
		newFields.splice(index, 0, newField);
		return newFields;
	}

	if (mode === "move-field") {
		const step = direction === "up" ? -1 : direction === "down" ? 1 : 0;
		const index = state.fields.indexOf(field);
		const newIndex = index + step;
		const newFields = [...state.fields];
		newFields.splice(newIndex, 0, newFields.splice(index, 1)[0]);
		return newFields;
	}
	throw Error("Invalid mode");
};

export const getConvertedLocalProgram = (getState) =>
	convertLocalProgram(getState().program);

export const convertLocalProgram = (program) => {
	const newProgram = {
		...program,
		fields: JSON.stringify(program.fields),
	};
	return newProgram;
};

export const convertRemoteProgram = (program) => {
	const newProgram = {
		...program,
		fields: JSON.parse(program.fields),
	};
	return newProgram;
};
