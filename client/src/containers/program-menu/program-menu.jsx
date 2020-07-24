import React, { useState } from "react";
import {
	Page,
	Menu,
	Stack,
	Heading,
	Row,
	Button,
	TextInput,
	TextArea,
	Separator,
} from "components";
import { ProgramFieldSnippet } from "./components";

const ProgramMenu = ({ program, modify, publish, openModal, history }) => {
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
		modify({ program, replaceProps: newProps });
	};

	const handleReset = () => {
		setNewName(name);
		setNewDesc(description);
	};

	const goBack = () => history.goBack();

	const menuHeader = <Heading>Edit Program</Heading>;

	const menuFooter = (
		<Row>
			<Button
				text={
					isPublishing ? "Publishing" : isPublished ? "Published" : "Publish"
				}
				handler={publish}
				disabled={isPublishing || isPublished || isPublic}
			/>
			<Button text="Done" handler={goBack} />
		</Row>
	);

	return (
		<Page>
			<Menu header={menuHeader} footer={menuFooter}>
				<Stack>
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

					{fields.map((field) => (
						<ProgramFieldSnippet
							key={field.name}
							program={program}
							field={field}
							modify={modify}
							openModal={openModal}
						/>
					))}
				</Stack>
			</Menu>
		</Page>
	);
};

export default ProgramMenu;
