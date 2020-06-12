const getLogPropNames = ({ dateStr, area, level }) => ({
	logName: dateStr.replace(/ /g, ""),
	areaName: area.name,
	level,
});

export const getStateWithAddedLog = (state, payload) => {
	const { logName, areaName, level } = getLogPropNames(payload);
	return {
		...state,
		[logName]: {
			...state[logName],
			[areaName]: level,
		},
	};
};

export const getStateWithRemovedLog = (state, payload) => {
	const { logName, areaName } = getLogPropNames(payload);

	// ignore if log or exercise doesn't exist
	if (
		!state.hasOwnProperty(logName) ||
		!state[logName].hasOwnProperty(areaName)
	) {
		return state;
	}
	const newState = { ...state };
	delete newState[logName][areaName];
	if (Object.keys(newState[logName]).length === 0) delete newState[logName];

	return newState;
};
