import React from "react";

import "./cell.scss";

const Cell = ({ dateOffset, intensity, restLevel, newEntry }) => {
	const isToday = dateOffset === 0;
	const isPast = dateOffset < 0;

	// TODO: force recovery day after N days of small exercise in a row

	let cellClass = "cell";
	if (isToday) cellClass += " cell--today";
	if (intensity === "plan" && !isPast) cellClass += " cell--planned";
	if (intensity > 0) cellClass += " cell--intensity-" + intensity;
	else if (restLevel) cellClass += " cell--recovery-" + restLevel;

	const hasMarker = intensity >= 0 || intensity === "plan";

	return (
		<div className={cellClass} onClick={newEntry}>
			{hasMarker && <div className={"cell__marker"}></div>}
		</div>
	);
};

export default Cell;
