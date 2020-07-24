import React, { useState } from "react";

import { Menu, Stack, Row, Heading, Button } from "components";
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
		title: "Parameters",
		render: (props) => <ParamsSection {...props} />,
	},
	{
		route: "levels",
		title: "Levels",
		render: (props) => <LevelsSection {...props} />,
	},
];

const ProgramFieldMenu = ({ data, closeModal, modifyProgram }) => {
	const { program, field } = data;
	const { fields } = program;

	const [name, setName] = useState(field.name || "");
	const [description, setDescription] = useState(field.description || "");
	const [levels, setLevels] = useState(field.levels || []);
	const [details, setDetails] = useState(field.details || []);
	const [icon, setIcon] = useState(field.icon || null);

	const [tab, setTab] = useState(tabsList[0]);

	const switchTabs = (e, tab) => {
		// e.preventDefault();
		setTab(tab);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newField = { name, description, levels, details, icon };
		modifyProgram({ program, fieldToReplace: { oldField: field, newField } });
		closeModal();
	};

	const handleEditName = (val) => {
		if (isUnique(val, fields, "name")) setName(val);
		else alert("Names must be unique.");
	};

	const isTabActive = (aTab) => aTab === tab;

	const menuHeader = (
		<Stack>
			<Heading>Edit Field</Heading>
			<Row>
				{tabsList.map((tab) => (
					<Button
						key={tab.title}
						handler={(e) => switchTabs(e, tab)}
						text={tab.title}
						active={isTabActive(tab)}
					/>
				))}
			</Row>
		</Stack>
	);

	const menuFooter = (
		<Row>
			<Button handler={closeModal} text="Cancel" />
			<Button handler={handleSubmit} text="Save" />
		</Row>
	);

	return (
		<Menu header={menuHeader} footer={menuFooter}>
			{/* Main content */}
			{tab.render({
				name,
				handleEditName,
				description,
				setDescription,
				icon,
				setIcon,
				details,
				setDetails,
				levels,
				setLevels,
			})}
		</Menu>
	);
};

export default ProgramFieldMenu;
