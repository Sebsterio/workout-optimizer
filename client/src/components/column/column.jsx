import React from "react";
import Field from "../../components/field/field.container";
import AsideField from "../../components/aside-field/aside-field";
import LogSpinner from "../../components/log-spinner/log-spinner.container";
import getDateInfo from "../../utils/date";
import "./column.scss";

const Column = ({ fields, day, isAside }) => {
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
				{fields.map((field) => (
					<div className="column__cell" key={field.name}>
						{isAside ? (
							<AsideField field={field} />
						) : (
							<Field dateOffset={day} dateStr={dateStr} field={field} />
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Column;
