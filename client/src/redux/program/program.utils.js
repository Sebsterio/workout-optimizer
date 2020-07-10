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

export const getUpdatedState = (state, payload) => {
	const { mode, field, newFieldData, direction } = payload;

	if (mode === "replace-prop") {
		return {
			...payload.newProps,
		};
	}

	if (mode === "replace-field") {
		const newFields = state.fields.map((f) => {
			if (f === field) return { ...newFieldData };
			return f;
		});
		return { fields: newFields };
	}

	if (mode === "delete-field") {
		const newFields = state.fields.filter((f) => f !== field);
		return { fields: newFields };
	}

	if (mode === "duplicate-field") {
		const index = state.fields.indexOf(field);
		const newField = {
			...field,
			name: field.name + " (copy)",
		};
		const newFields = [...state.fields];
		newFields.splice(index, 0, newField);
		return { fields: newFields };
	}

	if (mode === "move-field") {
		const step = direction === "up" ? -1 : direction === "down" ? 1 : 0;
		const index = state.fields.indexOf(field);
		const newIndex = index + step;
		const newFields = [...state.fields];
		newFields.splice(newIndex, 0, newFields.splice(index, 1)[0]);
		return { fields: newFields };
	}
	throw Error("Invalid mode");
};

export const convertLocalProgram = (getState) => {
	const program = { ...getState().program };
	program.fields = JSON.stringify(program.fields);
	return program;
};

export const convertRemoteProgram = (program) => {
	return {
		name: program.name,
		description: program.description,
		dateUpdated: program.dateUpdated,
		fields: JSON.parse(program.fields),
	};
};
