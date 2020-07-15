export const getFilteredArray = (array, itemToRemove) => [
	...array.filter((item) => item !== itemToRemove),
];

export const convertCurrentProgram = (program) => {
	const { _id, name, description, fields, dateUpdated } = program;
	return {
		_id,
		name,
		description,
		dateUpdated,
		fields: JSON.stringify(fields),
	};
};
