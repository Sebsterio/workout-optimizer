export const getFilteredArray = (array, itemToRemove) =>
	array.filter((item) => item !== itemToRemove);

export const getUpdatedArray = (array, payload) => {
	const { id, data } = payload;
	return array.map((el) => {
		if (el._id !== id) return el;
		else
			return {
				...el,
				...data,
			};
	});
};
