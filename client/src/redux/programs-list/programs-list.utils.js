import { removeArrayItem } from "utils/array";

export const getUpdatedAllList = (all, add, remove) => {
	let newAll = [...all];

	if (add) newAll = [add, ...removeArrayItem(newAll, remove)];
	else if (remove) newAll = removeArrayItem(newAll, remove);

	return newAll;
};

export const getConvertedLocalProgramsList = (getState) => {
	const { current, all, dateUpdated } = getState().programsList;
	return { current, all, dateUpdated };
};
