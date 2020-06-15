const getEntryPropNames = ({ dateStr, area, level }) => ({
	entryName: dateStr.replace(/ /g, "_"),
	areaName: area.name,
	level,
});

export const getStateWithAddedEntry = (state, payload) => {
	const { entryName, areaName, level } = getEntryPropNames(payload);
	return {
		...state,
		dateUpdated: new Date(),
		entries: {
			...state.entries,
			[entryName]: {
				...state.entries[entryName],
				[areaName]: level,
			},
		},
	};
};

export const getStateWithRemovedEntry = (state, payload) => {
	const { entryName, areaName } = getEntryPropNames(payload);

	// Ignore if log or exercise doesn't exist
	if (
		!state.entries.hasOwnProperty(entryName) ||
		!state.entries[entryName].hasOwnProperty(areaName)
	) {
		return state;
	}

	const newState = {
		...state,
		dateUpdated: new Date(),
	};
	delete newState.entries[entryName][areaName];
	if (Object.keys(newState.entries[entryName]).length === 0)
		delete newState.entries[entryName];

	return newState;
};
