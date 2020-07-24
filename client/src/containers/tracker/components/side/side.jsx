import React from "react";
import { Column, TrackerField, MiniSpinner } from "../index";

const Side = ({ fields }) => {
	return (
		<Column
			head={[<MiniSpinner />]}
			body={fields.map((field) => (
				<TrackerField field={field} />
			))}
		/>
	);
};

export default Side;
