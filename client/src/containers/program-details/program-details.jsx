import React from "react";
import { Menu, Row, Button, Heading, Text, Separator } from "components";
import { FieldSnippet } from "../programs/components/index";

const ProgramDetails = ({
	// parent
	program,
	// state
	isSaved,
	isActivated,
	// dispatch
	save,
	activate,
	closeModal,
	// withRouter
	history,
}) => {
	const { name, description, fields, dateModified } = program;

	const handleSave = () => {
		save();
		closeModal();
	};
	const handleActivate = () => {
		activate();
		closeModal();
		history.replace("/programs/private");
	};

	return (
		<Menu>
			<Row>
				<Button text="Back" handler={closeModal} />
				<Button
					text={isSaved ? "Saved" : "Save"}
					handler={handleSave}
					disabled={isSaved || isActivated}
				/>
				<Button
					text={isActivated ? "Activated" : "Activate"}
					handler={handleActivate}
					disabled={isActivated}
				/>
			</Row>

			<Heading small text={name}></Heading>
			<Text>{description}</Text>
			<Text size="small" secondary>
				Last updated: {new Date(dateModified).toDateString()}
			</Text>

			<Separator text="Fields" />

			{fields.map((field, i) => (
				<FieldSnippet field={field} key={i} />
			))}
		</Menu>
	);
};

export default ProgramDetails;
