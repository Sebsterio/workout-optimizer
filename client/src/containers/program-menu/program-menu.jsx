import React, { useState } from "react";
import { Menu, Row, Button, TextInput, TextArea, Separator } from "components";
import { ProgramField } from "./components";

const ProgramMenu = ({
	program,
	updateCurrentProgram,
	publishCurrentProgram,
	openModal,
	history,
}) => {
	const {
		name,
		description,
		fields,
		isPublishing,
		isPublished,
		isPublic,
	} = program;

	const [newName, setNewName] = useState(name);
	const [newDesc, setNewDesc] = useState(description);

	const handleSubmit = () => {
		const newProps = {};
		if (newName !== name) newProps.name = newName;
		if (newDesc !== description) newProps.description = newDesc;

		// If modifying public program, ensure name change
		if (isPublic && newName === name) {
			newProps.name = newName + " (custom)";
			setNewName(newProps.name);
		}
		updateCurrentProgram({ replaceProps: newProps });
	};

	const handleReset = () => {
		setNewName(name);
		setNewDesc(description);
	};

	// const handleAddField = () => updateCurrentProgram({ fieldToAdd: ...... });

	return (
		<Menu compact>
			<Row>
				<Button text="Back" handler={history.goBack} />
				<Button
					text={
						isPublishing ? "Publishing" : isPublished ? "Published" : "Publish"
					}
					handler={publishCurrentProgram}
					disabled={isPublishing || isPublished || isPublic}
				/>
				<Button disabled text="Delete" />
				<Button disabled text="Duplicate" />
			</Row>

			<Separator text="Info" />

			<Row>
				<TextInput
					name="name"
					label="Program Name:"
					value={newName || ""}
					handler={setNewName}
				/>
			</Row>

			<Row>
				<TextArea
					name="description"
					label="Description:"
					value={newDesc || ""}
					handler={setNewDesc}
				/>
			</Row>

			<Row>
				<Button
					text="Cancel"
					handler={handleReset}
					disabled={newName === name && newDesc === description}
				/>
				<Button
					text="Save"
					handler={handleSubmit}
					disabled={newName === name && newDesc === description}
				/>
			</Row>

			<Separator text="Fields" />

			{/* <Row>
				<Button
					text="New field"
					handler={handleAddField}
				/>
			</Row> */}

			{fields.map((field) => (
				<ProgramField
					key={field.name}
					field={field}
					updateCurrentProgram={updateCurrentProgram}
					openModal={openModal}
				/>
			))}
		</Menu>
	);
};

export default ProgramMenu;
