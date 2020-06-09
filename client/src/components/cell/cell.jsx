import React from "react";

import trackerData from "../../pages/tracker/tracker.data";

import "./cell.scss";

// -----------------------------------------------------

const Cell = ({ bodyPart, dateStr, isToday, isFuture, addEntry }) => {
	const { log } = trackerData;
	const dayLog = log.find((entry) => entry.date === dateStr);
	const intensity = dayLog ? dayLog[bodyPart.name] : null;

	let cellClass = "cell";
	if (isToday) cellClass += " cell--today";
	if (intensity === 0) cellClass += " cell--planned";
	else if (intensity > 0) cellClass += " cell--intensity-" + intensity;
	else if (intensity < 0) cellClass += " cell--recovery-" + intensity * -1;

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
