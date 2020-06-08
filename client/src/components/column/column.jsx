import React from "react";

import trackerData from "../../pages/tracker/tracker.data";

import Cell from "../../components/cell/cell";

import "./column.scss";

const Column = ({ isVisible, i, headOffsetY, dateOffset }) => {
	if (!isVisible) return <div className="column column--empty"></div>;

	const { bodyParts } = trackerData.protocol;

	const isToday = dateOffset === 0;
	const date = new Date(new Date());
	date.setDate(date.getDate() + dateOffset);
	const dateStr = date.toDateString();
	const dateArr = dateStr.split(" ");
	const weekDay = dateArr[0];
	const monthDay = dateArr[2];

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
					key={bodyPart.name}
				/>
			))}
		</div>
	);
};

export default Column;
