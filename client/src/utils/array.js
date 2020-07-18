export const replaceArrayItem = (arr, oldItem, newItem) =>
	arr.map((item) => (item === oldItem ? newItem : item));

export const deleteArrayItem = (array, item) =>
	array.filter((curItem) => curItem !== item);

export const duplicateArrayItem = (array, item, modifier) => {
	const index = array.indexOf(item);
	const newItem = modifier(item);
	array.splice(index, 0, newItem); // don't return
	return array;
};

export const moveArrayItem = (array, item, steps) => {
	const index = array.indexOf(item);
	const newIndex = index + steps;
	array.splice(newIndex, 0, array.splice(index, 1)[0]); // don't return
	return array;
};
