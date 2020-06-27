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

export const getNewFields = (state, payload) => {
	const { field, newFieldData } = payload;
	return state.fields.map((f) => {
		if (f === field) return { ...newFieldData };
		return f;
	});
};
