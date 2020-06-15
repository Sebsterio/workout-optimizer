import { createSelector } from "reselect";
// import { createCachedSelector } from "re-reselect";

import getDateInfo from "../../utils/date";

// const selectLog = (state) => state.log;

const selectEntry = (state, props) => {
	const entryName = props.dateStr.replace(/ /g, "_");
	return state.log.entries[entryName];
};

const selectIntensity = (state, props) => {
	const entry = selectEntry(state, props);
	return entry ? entry[props.area.name] : null;
};

// check as many previous days as the highest possible rest period is for given exercise
const getRestLevel = (state, props) => {
	const { area, dateStr } = props;
	const maxRestTime = area.levels[area.levels.length - 1].rest;
	let maxRestLevel = 0;

	for (let i = 1; i <= maxRestTime; i++) {
		const tempProps = { ...props };
		tempProps.dateStr = getDateInfo(dateStr, -i).dateStr;
		const intensity = selectIntensity(state, tempProps);

		if (intensity && intensity > 0) {
			const dayRestLevel = area.levels[intensity].rest - i + 1;
			if (dayRestLevel > maxRestLevel) maxRestLevel = dayRestLevel;
		}
	}
	return maxRestLevel;
};

export const makeGetEntry = () =>
	createSelector([selectEntry], (entry) => entry);

export const makeGetIntensity = () =>
	createSelector([selectIntensity], (intensity) => intensity);

export const makeGetRestLevel = () =>
	createSelector([getRestLevel], (restLevel) => restLevel);
