import React from "react";
import { Column, Field } from "../index";
import getDateInfo from "utils/date";

const Day = ({ fields, day }) => {
	const { weekDay, monthDay, dateStr } = getDateInfo(new Date(), day) || null;

	return (
		<Column
			isToday={day === 0}
			head={[weekDay, monthDay]}
			body={fields.map((field) => (
				<Field dateOffset={day} dateStr={dateStr} field={field} />
			))}
		/>
	);
};

export default Day;
