import trackerData from "./tracker.data";

const { log } = trackerData;

export const addToLog = (dateStr, bodyPart, level) => {
	const dayLog = log.find((entry) => entry.date === dateStr);
	if (dayLog) {
		// don't overwrite exercise lvl with recovery lvl
		// if (level < 0 && dayLog[bodyPart.name] > 0) return;
		dayLog[bodyPart.name] = level;
	} else {
		log.push({
			date: dateStr,
			[bodyPart.name]: level,
		});
	}
};
