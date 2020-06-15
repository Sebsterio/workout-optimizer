const getEntryPropNames = ({ dateStr, area, level }) => ({
	entryName: dateStr.replace(/ /g, "_"),
	areaName: area.name,
	level,
});

export const getStateWithAddedEntry = (state, payload) => {
	const { entryName, areaName, level } = getEntryPropNames(payload);
	return {
		...state,
		[entryName]: {
			...state[entryName],
			[areaName]: level,
		},
	};
};

export const getStateWithRemovedEntry = (state, payload) => {
	const { entryName, areaName } = getEntryPropNames(payload);

	// ignore if log or exercise doesn't exist
	if (
		!state.hasOwnProperty(entryName) ||
		!state[entryName].hasOwnProperty(areaName)
	) {
		return state;
	}
	const newState = { ...state };
	delete newState[entryName][areaName];
	if (Object.keys(newState[entryName]).length === 1) delete newState[entryName];

	return newState;
};
