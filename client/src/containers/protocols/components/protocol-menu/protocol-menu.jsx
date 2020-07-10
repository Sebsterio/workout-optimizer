import React, { useState } from "react";
import { Menu, Row, Button, TextInput, TextArea, Separator } from "components";
import { ProtocolField } from "../index";

const ProtocolMenu = ({
	protocol,
	goBack,
	updateProtocol,
	publishProtocol,
	openModal,
}) => {
	const { name, description, fields, isPublishing, isPublished } = protocol;

	const [newName, setNewName] = useState(name);
	const [newDesc, setNewDesc] = useState(description);

	const handleSubmit = () => {
		const newProps = {};
		if (newName !== name) newProps.name = newName;
		if (newDesc !== description) newProps.description = newDesc;
		updateProtocol({ mode: "replace-prop", newProps });
	};

	const handleReset = () => {
		setNewName(name);
		setNewDesc(description);
	};

	return (
		<Menu compact>
			<Row>
				<Button text="Back" handler={goBack} />
				<Button
					text={
						isPublishing ? "Publishing" : isPublished ? "Published" : "Publish"
					}
					handler={publishProtocol}
					disabled={isPublishing || isPublished}
				/>
				<Button disabled text="Delete" />
				<Button disabled text="Activate" />
			</Row>

			<Separator text="Info" />

			<Row>
				<TextInput
					name="name"
					label="Protocol Name:"
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

			{fields.map((field) => (
				<ProtocolField
					key={field.name}
					field={field}
					updateProtocol={updateProtocol}
					openModal={openModal}
				/>
			))}
		</Menu>
	);
};

export default ProtocolMenu;
