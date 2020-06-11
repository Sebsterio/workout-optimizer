import { INITIAL_STATE } from "./log.initialState";
import logActionTypes from "./log.types";

const logReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case logActionTypes.ADD_LOG: {
			const { dateStr, area, level } = action.payload;
			const logname = dateStr.replace(/ /g, "");
			const areaName = area.name;
			return {
				...state,
				[logname]: {
					...state[logname],
					[areaName]: level,
				},
			};
		}

		// Add exercise to an existing log
		// case logActionTypes.ADD_TO_LOG:
		// 	const { dayLog, area, level } = action.payload;
		// 	const newDayLog = {...dayLog, [area.name]: level}
		// 	return [...state, newDayLog]

		default:
			return state;
	}
};

export default logReducer;
