import React, { useState } from "react";

import { Separator, Menu, Row, Heading, Button, TextInput } from "components";

import { isUnique } from "./program-field-menu.utils";
import {
	DescriptionSection,
	ParamsSection,
	LevelsSection,
	IconPicker,
} from "./components";

const tabsList = [
	{
		route: "description",
		title: "Description",
		render: (props) => <DescriptionSection {...props} />,
	},
	{
		route: "icon",
		title: "Icon",
		render: (props) => <IconPicker {...props} />,
	},
	{
		route: "parameters",
		title: "Exercise Parameters",
		render: (props) => <ParamsSection {...props} />,
	},
	{
		route: "levels",
		title: "Levels (Quick-Add Buttons)",
		render: (props) => <LevelsSection {...props} />,
	},
];

const ProgramFieldMenu = ({
	cellData,
	fields,
	closeModal,
	updateCurrentProgram,
}) => {
	const { field } = cellData;

	const [name, setName] = useState(field.name || "");
	const [description, setDescription] = useState(field.description || "");
	const [levels, setLevels] = useState(field.levels || []);
	const [details, setDetails] = useState(field.details || []);
	const [icon, setIcon] = useState(field.icon || null);

	const [tab, setTab] = useState(tabsList[0]);

	const switchTabs = (e, tab) => {
		e.preventDefault();
		setTab(tab);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newField = { name, description, levels, details, icon };
		updateCurrentProgram({ fieldToReplace: { oldField: field, newField } });
		closeModal();
	};

	const handleEditName = (val) => {
		if (isUnique(val, fields, "name")) setName(val);
		else alert("Names must be unique.");
	};

	return (
		<Menu>
			<Heading>Edit Field</Heading>
			<TextInput
				name="name"
				label="name"
				value={name}
				handler={handleEditName}
			/>
			{/* nav tabs */}
			<Row>
				{tabsList.map((tab) => (
					<Button
						key={tab.route}
						handler={(e) => switchTabs(e, tab)}
						text={tab.route}
					/>
				))}
			</Row>

			{/* Main content */}
			<Separator text={tab.title} />
			{tab.render({
				description,
				setDescription,
				icon,
				setIcon,
				details,
				setDetails,
				levels,
				setLevels,
			})}

			{/* Permanent buttons */}
			<Separator />
			<Row>
				<Button handler={closeModal} text="Cancel" />
				<Button handler={handleSubmit} text="Save" />
			</Row>
		</Menu>
	);
};

export default ProgramFieldMenu;
