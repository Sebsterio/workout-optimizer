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
	const { mode } = payload;
	console.log(payload);

	if (mode === "replace-prop") {
		return {
			...payload.newProps,
		};
	}

	if (mode === "replace-field") {
		const { field, newFieldData } = payload;
		const newFields = state.fields.map((f) => {
			if (f === field) return { ...newFieldData };
			return f;
		});
		return { fields: newFields };
	}

	if (mode === "delete-field") {
		const { field } = payload;
		const newFields = state.fields.filter((f) => f !== field);
		return { fields: newFields };
	}
};
