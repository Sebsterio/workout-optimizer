import React from "react";
import { Column, TrackerField, MiniSpinner } from "../index";

const Side = ({ fields }) => {
	return (
		<Column
			isSide
			head={[<MiniSpinner />]}
			body={fields.map((field) => (
				<TrackerField field={field} />
			))}
		/>
	);
};

export default Side;
