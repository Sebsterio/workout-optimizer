import React from "react";
import Field from "../../components/field/field.container";
import LogSpinner from "../../components/log-spinner/log-spinner.container";
import getDateInfo from "../../utils/date";
import "./column.scss";

const Column = ({ areas, day = null, scrollTop }) => {
	const isAside = day === null;
	const translateY = scrollTop
		? { transform: `translateY(${-scrollTop}px)` }
		: null;
	const { weekDay, monthDay, dateStr } = getDateInfo(new Date(), day) || null;

	let columnClass = "column";
	if (day === 0) columnClass += " column--today";

	return (
		<div className={columnClass}>
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
			<div className="column__body" style={translateY && translateY}>
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
