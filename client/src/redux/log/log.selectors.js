import { createSelector } from "reselect";
// import { createCachedSelector } from "re-reselect";

import getDateInfo from "../../utils/date";

// const selectLog = (state) => state.log;

const selectEntry = (state, props) => {
	const entryName = props.dateStr.replace(/ /g, "_");
	return state.log.entries[entryName];
};

const selectStats = (state, props) => {
	const entry = selectEntry(state, props);
	return entry ? entry[props.field.name] : null;
};

const getRestLevel = (state, props) => {
	const { field, dateStr } = props;

	// Find max possible rest time for given exercise
	const fieldMaxRestTime = field.levels.reduce((acc, cur) =>
		cur.intensity > acc.intensity ? cur : acc
	).rest;

	let maxRestLevelToday = 0;

	// Check as many past days as max rest time
	for (let i = 1; i <= fieldMaxRestTime; i++) {
		const tempProps = { ...props };
		tempProps.dateStr = getDateInfo(dateStr, -i).dateStr;
		const stats = selectStats(state, tempProps);
		const intensity = stats ? stats.intensity : null;

		// Get the highset rest today from all past days
		if (intensity && intensity > 0) {
			const dayLevel = field.levels.find(
				(level) => level.intensity === intensity
			);
			const dayRestLevelToday = dayLevel.rest - i + 1;
			if (dayRestLevelToday > maxRestLevelToday)
				maxRestLevelToday = dayRestLevelToday;
		}
	}
	return maxRestLevelToday;
};

export const makeGetEntry = () =>
	createSelector([selectEntry], (entry) => entry);

export const makeGetStats = () =>
	createSelector([selectStats], (stats) => stats);

export const makeGetRestLevel = () =>
	createSelector([getRestLevel], (restLevel) => restLevel);
