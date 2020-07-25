import { createSelector } from "reselect";
import getDateInfo from "../../utils/date";

// ------------------ Simple selectors ----------------------

export const getIsLogSyncing = (state) => state.log.isSyncing;

export const getIsLogSynced = (state) => state.log.isSynced;

// ------------------ Complex selectors ----------------------

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
	const fieldMaxStandardRest = field.levels.reduce((acc, cur) =>
		cur.intensity > acc.intensity ? cur : acc
	).rest;
	const fieldMaxCustomRest = field.maxCustomRest || 0;
	const fieldMaxRestTime = Math.max(fieldMaxStandardRest, fieldMaxCustomRest);

	let maxRestLevelToday = 0;

	// Check as many past days as max rest time & get the highset rest today
	for (let i = 1; i <= fieldMaxRestTime; i++) {
		const tempProps = { ...props };
		tempProps.dateStr = getDateInfo(dateStr, -i).dateStr;
		const stats = selectStats(state, tempProps);
		const rest = stats ? stats.rest - i + 1 : 0;
		if (rest > maxRestLevelToday) maxRestLevelToday = rest;
	}
	return maxRestLevelToday;
};

// "Maker" functions allow each component to cache the selector individually

export const makeGetEntry = () =>
	createSelector([selectEntry], (entry) => entry);

export const makeGetStats = () =>
	createSelector([selectStats], (stats) => stats);

export const makeGetRestLevel = () =>
	createSelector([getRestLevel], (restLevel) => restLevel);
