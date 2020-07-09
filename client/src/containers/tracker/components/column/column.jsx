import React from "react";
import { Field, SideField, MiniSpinner } from "../index";
import getDateInfo from "utils/date";
import "./column.scss";

const Column = ({ fields, day, isAside }) => {
	if (isAside)
		return (
			<div className="column column--side">
				<div className="column__head">
					<MiniSpinner />
				</div>
				<div className="column__body">
					{fields.map((field) => (
						<div className="column__cell" key={field.name}>
							<SideField field={field} />
						</div>
					))}
				</div>
			</div>
		);

	const { weekDay, monthDay, dateStr } = getDateInfo(new Date(), day) || null;

	return (
		<div className={`column ${day === 0 ? "column--today" : ""}`}>
			<div className="column__head">
				<span className="column__weekDay">{weekDay}</span>
				<span className="column__monthDay">{monthDay}</span>
			</div>
			<div className="column__body">
				{fields.map((field) => (
					<div className="column__cell" key={field.name}>
						<Field dateOffset={day} dateStr={dateStr} field={field} />
					</div>
				))}
			</div>
		</div>
	);
};

export default Column;
