import React from "react";
import getDateInfo from "../../utils/date";
import Cell from "../../components/cell/cell";
import "./column.scss";

const Column = ({ isVisible, headOffsetY, dateOffset, addEntry, areas }) => {
	if (!isVisible) return <div className="column column--empty"></div>;

	const today = new Date();
	const { weekDay, monthDay, dateStr } = getDateInfo(today, dateOffset);

	const headClassName =
		"column__head " + (dateOffset === 0 ? "column__head--today" : "");

	return (
		<div className="column">
			<div className={headClassName} style={headOffsetY}>
				<span className="column__weekDay">{weekDay}</span>
				<span className="column__monthDay">{monthDay}</span>
			</div>
			{areas.map((bodyPart) => (
				<Cell
					dateStr={dateStr}
					bodyPart={bodyPart}
					dateOffset={dateOffset}
					key={bodyPart.name}
					addEntry={addEntry}
				/>
			))}
		</div>
	);
};

export default Column;
