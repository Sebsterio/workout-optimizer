import React from "react";

import trackerData from "../../pages/tracker/tracker.data";
import getDate from "../../utils/date";

import Cell from "../../components/cell/cell";

import "./column.scss";

const Column = ({ isVisible, headOffsetY, dateOffset, addEntry }) => {
	if (!isVisible) return <div className="column column--empty"></div>;

	const { bodyParts } = trackerData.protocol;

	const isToday = dateOffset === 0;
	const isFuture = dateOffset > 0;
	const today = new Date();
	const { weekDay, monthDay, dateStr } = getDate(today, dateOffset);

	const headClassName =
		"column__head " + (isToday ? "column__head--today" : "");

	return (
		<div className="column">
			<div className={headClassName} style={headOffsetY}>
				<span className="column__weekDay">{weekDay}</span>
				<span className="column__monthDay">{monthDay}</span>
			</div>
			{bodyParts.map((bodyPart) => (
				<Cell
					dateStr={dateStr}
					bodyPart={bodyPart}
					isToday={isToday}
					isFuture={isFuture}
					key={bodyPart.name}
					addEntry={addEntry}
				/>
			))}
		</div>
	);
};

export default Column;
