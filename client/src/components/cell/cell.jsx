import React from "react";

import trackerData from "../../pages/tracker/tracker.data";
import getDateInfo from "../../utils/date";

import "./cell.scss";

const getIntensity = (bodyPart, dateStr, log) => {
	const dayLog = log.find((entry) => entry.date === dateStr);
	return dayLog ? dayLog[bodyPart.name] : null;
};

const getRestLevel = (bodyPart, dateStr, log) => {
	const maxRestTime = bodyPart.levels[bodyPart.levels.length - 1].rest;
	let cellRestLevel = 0;

	for (let i = 1; i <= maxRestTime; i++) {
		const pastDateStr = getDateInfo(dateStr, -i).dateStr;
		const intensity = getIntensity(bodyPart, pastDateStr, log);
		if (intensity) {
			const dayRestLevel = bodyPart.levels[intensity].rest - i + 1;
			if (dayRestLevel > cellRestLevel) cellRestLevel = dayRestLevel;
		}
	}
	return cellRestLevel;
};

// -----------------------------------------------------

const Cell = ({ bodyPart, dateStr, dateOffset, addEntry }) => {
	const { log } = trackerData;

	const isToday = dateOffset === 0;
	const isFuture = dateOffset > 0;

	const intensity = getIntensity(bodyPart, dateStr, log);
	const restLevel = getRestLevel(bodyPart, dateStr, log);

	// TODO: force recovery day after N days of small exercise in a row

	let cellClass = "cell";
	if (isToday) cellClass += " cell--today";
	if (intensity === 0) cellClass += " cell--planned";
	if (intensity) cellClass += " cell--intensity-" + intensity;
	if (restLevel) cellClass += " cell--recovery-" + restLevel;

	const handleClick = () => {
		if (isFuture) return;
		else addEntry({ bodyPart, dateStr });
	};
	return (
		<div className={cellClass} onClick={handleClick}>
			{intensity > 0 ? <div className={"cell__marker"}></div> : ""}
		</div>
	);
};

export default Cell;
