import React, { useState } from "react";
import "./row-form.scss";

import { isUnique } from "./row-form.utils";

import TextInputSection from "./subcomponents/text-input-section";
import ParamsSection from "./subcomponents/params-section";
import LevelsSection from "./subcomponents/levels-section";
import ButtonsSection from "./subcomponents/buttons-section";
import IconPicker from "./subcomponents/icon-picker";
import Separator from "../separator/separator";

const RowForm = ({ cellData, fields, closeModal, updateProtocol }) => {
	const { field } = cellData;

	const [name, setName] = useState(field.name || "");
	const [description, setDescription] = useState(field.description || "");
	const [levels, setLevels] = useState(field.levels || []);
	const [details, setDetails] = useState(field.details || []);
	const [icon, setIcon] = useState(field.icon || null);
	// const [customRestLimit] = useState(field.customRestLimit || 6)

	const [tab, setTab] = useState("description");
	const tabsList = ["description", "icon", "parameters", "levels"];
	const switchTabs = (e) => {
		e.preventDefault();
		setTab(e.target.dataset.tab);
	};

	// Update protocol field in redux & db
	const handleSubmit = (e) => {
		e.preventDefault();
		const newFieldData = { name, description, levels, details, icon };
		updateProtocol({ mode: "replace-field", field, newFieldData });
		closeModal();
	};

	const handleEditName = (e) => {
		const newName = e.target.value;
		if (isUnique(newName, fields, "name")) setName(newName);
		else alert("Names must be unique.");
	};

	return (
		<div className="row-form">
			<h1 className="modal__title">Exercise Config</h1>

			<TextInputSection name="name" value={name} handler={handleEditName} />

			<nav className="row-form__nav">
				{tabsList.map((tab) => (
					<button
						key={tab}
						className="row-form__nav-item"
						data-tab={tab}
						onClick={switchTabs}
					>
						{tab}
					</button>
				))}
			</nav>

			{tab === "description" && (
				<>
					<Separator text="Description" />
					<textarea
						name="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						cols="30"
						rows="10"
					></textarea>
				</>
			)}
			{tab === "icon" && (
				<>
					<Separator text="Icon" />
					<IconPicker icon={icon} setIcon={setIcon} />
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
