import React from "react";
import Field from "../../components/field/field.container";
import LogSpinner from "../../components/log-spinner/log-spinner.container";
import getDateInfo from "../../utils/date";
import "./column.scss";

const Column = ({ areas, day, isAside }) => {
	const { weekDay, monthDay, dateStr } = getDateInfo(new Date(), day) || null;

	let colClass = "column";
	if (day === 0) colClass += " column--today";
	if (isAside) colClass += " column--aside";

	return (
		<div className={colClass}>
			<div className="column__head">
				{isAside ? (
					<LogSpinner />
				) : (
					<>
						<span className="column__weekDay">{weekDay}</span>
						<span className="column__monthDay">{monthDay}</span>
					</>
				)}
			</div>
			<div className="column__body">
				{areas.map((area) => (
					<div className="column__cell" key={area.name}>
						{isAside ? (
							area.name
						) : (
							<Field dateOffset={day} dateStr={dateStr} area={area} />
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Column;
