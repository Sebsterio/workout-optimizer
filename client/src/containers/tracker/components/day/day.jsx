import React from "react";
import { Column, Entry } from "../index";
import getDateInfo from "utils/date";

const Day = ({ fields, day }) => {
	const { weekDay, monthDay, dateStr } = getDateInfo(new Date(), day) || null;

	return (
		<Column
			isToday={day === 0}
			head={[weekDay, monthDay]}
			body={fields.map((field) => (
				<Entry dateOffset={day} dateStr={dateStr} field={field} />
			))}
		/>
	);
};

export default Day;
