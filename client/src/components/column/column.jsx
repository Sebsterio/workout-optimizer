import React from "react";
import getDateInfo from "../../utils/date";
import CellContainer from "../../components/cell/cell.container";
import "./column.scss";

const Column = ({ isVisible, headOffsetY, dateOffset, areas }) => {
	if (!isVisible) return <div className="column column--empty"></div>;

	const { weekDay, monthDay, dateStr } = getDateInfo(new Date(), dateOffset);

	const headClassName =
		"column__head " + (dateOffset === 0 ? "column__head--today" : "");

	return (
		<div className="column">
			<div className={headClassName} style={headOffsetY}>
				<span className="column__weekDay">{weekDay}</span>
				<span className="column__monthDay">{monthDay}</span>
			</div>
			{areas.map((area) => (
				<CellContainer
					dateStr={dateStr}
					area={area}
					dateOffset={dateOffset}
					key={area.name}
				/>
			))}
		</div>
	);
};

export default Column;
