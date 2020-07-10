import React, { useState } from "react";
import {
	Page,
	Menu,
	Heading,
	Row,
	Button,
	TextInput,
	TextArea,
	Separator,
} from "components";
import { ProtocolField } from "./components";

const ProtocolsPage = ({ protocol, updateProtocol }) => {
	const { name, description, fields } = protocol;

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
		<Page>
			<Menu compact>
				<Heading text="Protocols Page" />

				<Row>
					<Button disabled text="Publish" />
					<Button disabled text="Download" />
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
					<ProtocolField key={field.name} field={field} />
				))}
			</Menu>
		</Page>
	);
};

export default ProtocolsPage;
