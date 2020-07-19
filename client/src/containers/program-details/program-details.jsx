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
	activateSaved,
	activateFetched,
	closeModal,
	// withRouter
	history,
}) => {
	const { name, description, fields, dateUpdated } = program;
	const fieldsArr = JSON.parse(fields);

	const handleSave = () => {
		save();
		closeModal();
	};
	const handleActivate = () => {
		if (isSaved) activateSaved();
		else activateFetched();
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
					disabled={isSaved}
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
				Last updated: {new Date(dateUpdated).toDateString()}
			</Text>

			<Separator text="Fields" />

			{fieldsArr.map((field, i) => (
				<FieldSnippet field={field} key={i} />
			))}
		</Menu>
	);
};

export default ProgramDetails;
