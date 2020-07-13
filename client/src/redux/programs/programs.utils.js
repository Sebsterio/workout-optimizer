export const getFilteredArray = (array, itemToRemove) => [
	...array.filter((item) => item !== itemToRemove),
];
