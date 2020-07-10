import React from "react";
import { Field, SideField, MiniSpinner } from "../index";
import getDateInfo from "utils/date";
import "./column.scss";

const Column = ({ fields, day, isAside }) => {
	if (isAside)
		return (
			<div className="tracker-column tracker-column--side">
				<div className="tracker-column__head">
					<MiniSpinner />
				</div>
				<div className="tracker-column__body">
					{fields.map((field) => (
						<div className="tracker-column__cell" key={field.name}>
							<SideField field={field} />
						</div>
					))}
				</div>
			</div>
		);

	const { weekDay, monthDay, dateStr } = getDateInfo(new Date(), day) || null;

	return (
		<div
			className={`tracker-column ${day === 0 ? "tracker-column--today" : ""}`}
		>
			<div className="tracker-column__head">
				<span className="tracker-column__weekDay">{weekDay}</span>
				<span className="tracker-column__monthDay">{monthDay}</span>
			</div>
			<div className="tracker-column__body">
				{fields.map((field) => (
					<div className="tracker-column__cell" key={field.name}>
						<Field dateOffset={day} dateStr={dateStr} field={field} />
					</div>
				))}
			</div>
		</div>
	);
};

export default Column;
