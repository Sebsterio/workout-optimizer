import React from "react";
import Field from "../../components/field/field.container";
import AsideField from "../../components/aside-field/aside-field";
import LogSpinner from "../../components/log-spinner/log-spinner.container";
import getDateInfo from "../../utils/date";
import "./column.scss";

const Column = ({ fields, day, isAside }) => {
	if (isAside)
		return (
			<div className="column column--aside">
				<div className="column__head">
					<LogSpinner />
				</div>
				<div className="column__body">
					{fields.map((field) => (
						<div className="column__cell" key={field.name}>
							<AsideField field={field} />
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
