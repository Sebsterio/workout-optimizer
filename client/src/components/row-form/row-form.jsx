import React, { useState } from "react";
import "./row-form.scss";

import TextInputSection from "./subcomponents/text-input-section";
import ParamsSection from "./subcomponents/params-section";
import LevelsSection from "./subcomponents/levels-section";
import ButtonsSection from "./subcomponents/buttons-section";
import Separator from "../separator/separator";

const RowForm = ({ cellData, closeModal, updateProtocol }) => {
	const { field } = cellData;

	const [name, setName] = useState(field.name || "");
	const [description, setDescription] = useState(field.description || "");
	const [levels, setLevels] = useState(field.levels || []);
	const [details, setDetails] = useState(field.details || []);
	// const [icon, setIcon] = useState(field.icon || null)
	// const [customRestLimit] = useState(field.customRestLimit || 6)

	const [tab, setTab] = useState("general");
	const tabsList = ["general", "parameters", "levels"];
	const switchTabs = (e) => {
		e.preventDefault();
		setTab(e.target.dataset.tab);
	};

	// Update protocol field in redux & db
	const handleSubmit = (e) => {
		e.preventDefault();
		const newFieldData = { name, description, levels, details };
		updateProtocol({ field, newFieldData });
		closeModal();
	};

	return (
		<div className="row-form">
			<h1 className="modal__title">Exercise Config</h1>

			<TextInputSection name="name" value={name} handler={setName} />

			<nav className="row-form__nav">
				{tabsList.map((tab) => (
					<a
						key={tab}
						href="#"
						className="row-form__nav-item"
						data-tab={tab}
						onClick={switchTabs}
					>
						{tab}
					</a>
				))}
			</nav>

			{tab === "general" && (
				<>
					<Separator text="General Settings" />
					<TextInputSection
						name="description"
						value={description}
						handler={setDescription}
					/>
					{/* <div>--- IconPicker here... ---</div> */}
				</>
			)}

			{tab === "parameters" && (
				<>
					<Separator text="Exercise Parameters" />
					<ParamsSection details={details} setDetails={setDetails} />
				</>
			)}

			{tab === "levels" && (
				<>
					<Separator text="Levels (Quick-Add Buttons)" />
					<LevelsSection levels={levels} setLevels={setLevels} />
				</>
			)}

			<Separator />
			<ButtonsSection handleSubmit={handleSubmit} closeModal={closeModal} />
		</div>
	);
};

export default RowForm;
