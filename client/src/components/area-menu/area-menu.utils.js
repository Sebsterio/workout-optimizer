export const isUnique = (val, arr, propName) =>
	arr.every((item) => item[propName] !== val);

export const getUniqueLabel = (arr) => {
	let newLabel = "new";
	let i = 1;
	while (!isUnique(newLabel, arr, "label")) {
		newLabel = "new-" + i;
		i++;
	}
	return newLabel;
};

export const getValueFromInput = (type, checked, value) =>
	type === "checkbox" ? checked : type === "number" ? Number(value) : value;

export const isInputValid = (name, val, arr) => {
	if (name === "label") {
		if (!isUnique(val, arr, "label")) {
			alert("Labels must be unique");
			return false;
		}
		if (val === "done") {
			alert('"Done" is a reserved keyword');
			return false;
		}
	}
	return true;
};

export const getUpdatedArray = (arr, index, name, val) => {
	const newArr = [...arr];
	newArr[index][name] = val;
	return newArr;
};

export const getSplicedArray = (arr, index, count = 1) => {
	const newArr = [...arr];
	newArr.splice(index, count);
	return newArr;
};

export const getInjectedArray = (arr, newEl) => {
	const newArr = [...arr];
	const lastEl = newArr.pop();
	return [...newArr, newEl, lastEl];
};
