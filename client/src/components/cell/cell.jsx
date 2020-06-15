import React from "react";

import "./cell.scss";

const Cell = (props) => {
	const { dateOffset, intensity, restLevel, addEntry, openModal } = props;

	const isToday = dateOffset === 0;
	const isPast = dateOffset < 0;
	const isFuture = dateOffset > 0;

	const handleSubmit = () => {
		if (isFuture) addEntry({ ...props, level: -1 });
		else openModal(props);
	};

	let cellClass = "cell";
	if (isToday) cellClass += " cell--today";
	if (intensity < 0 && !isPast) cellClass += " cell--planned";
	if (intensity > 0) cellClass += " cell--intensity-" + intensity;
	else if (restLevel) cellClass += " cell--recovery-" + restLevel;

	return (
		<div className={cellClass} onClick={handleSubmit}>
			{intensity && <div className={"cell__marker"}></div>}
		</div>
	);
};

export default Cell;
