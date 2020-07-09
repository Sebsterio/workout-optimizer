import React from "react";
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

	const handleChange = (e) => {
		const newProps = {
			[e.target.name]: e.target.value,
		};
		updateProtocol({ mode: "replace-prop", newProps });
	};

	return (
		<Page>
			<Menu>
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
						value={name || ""}
						handler={handleChange}
					/>
				</Row>

				<Row>
					<TextArea
						name="description"
						label="Description:"
						value={description || ""}
						handler={handleChange}
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
