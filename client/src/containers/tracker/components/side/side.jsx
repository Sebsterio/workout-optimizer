import React from "react";
import { Column, SideField, MiniSpinner } from "../index";

const Side = ({ fields }) => {
	return (
		<Column
			head={[<MiniSpinner />]}
			body={fields.map((field) => (
				<SideField field={field} />
			))}
		/>
	);
};

export default Side;
