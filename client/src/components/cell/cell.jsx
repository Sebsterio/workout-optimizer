import React from "react";

import trackerData from "../../pages/tracker/tracker.data";

import "./cell.scss";

const addEntry = ({ bodyPart, dateStr, intensity }) => {
	console.log({ bodyPart, dateStr, intensity });
};

// -----------------------------------------------------

const Cell = ({ bodyPart, dateStr, isToday }) => {
	const { log } = trackerData;
	const dayLog = log.find((entry) => entry.date === dateStr);
	const intensity = dayLog ? dayLog[bodyPart.name] : 0;

	let cellClass = "cell";
	if (isToday) cellClass += " cell--today";
	if (intensity > 0) cellClass += " cell--intensity-" + intensity;
	if (intensity < 0) cellClass += " cell--recovery-" + intensity * -1;

	return (
		<div
			className={cellClass}
			// TEMP: will use modal
			onClick={() => addEntry({ bodyPart, dateStr, intensity })}
		>
			{intensity > 0 ? <div className={"cell__marker"}></div> : ""}
		</div>
	);
};

export default Cell;
