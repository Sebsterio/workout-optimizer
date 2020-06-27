import React, { useState } from "react";
import "./row-form.scss";

import DetailsSection from "./subcomponents/details-section";
import TextInputSection from "./subcomponents/text-input-section";
import Separator from "../separator/separator";

const RowForm = ({ cellData, closeModal }) => {
	const { field } = cellData;

	const [name, setName] = useState(field.name || "");
	const [description, setDescription] = useState(field.description || "");
	const [levels, setLevels] = useState(field.levels || []);
	const [details, setDetails] = useState(field.details || []);
	// const [icon, setIcon] = useState(field.icon || null)
	// const [customRestLimit] = useState(field.customRestLimit || 6)

	return (
		<div className="row-form">
			<TextInputSection name="name" value={name} handler={setName} />
			<TextInputSection
				name="description"
				value={description}
				handler={setDescription}
			/>
			<Separator text="Exercise Parameters" />
			<DetailsSection details={details} setDetails={setDetails} />
		</div>
	);

	// details
	// levels (quick-add buttons)
	// custom rest limit

	// buttons: cancel, save
};

export default RowForm;
