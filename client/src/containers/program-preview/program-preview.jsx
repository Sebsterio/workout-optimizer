import React from "react";
import { Menu, Stack, Row, Button, Heading, Text, Separator } from "components";
import { FieldPreview } from "./components";

const ProgramPreview = ({
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

	const menuHeader = <Heading small text={name}></Heading>;

	const menuFooter = (
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
	);

	return (
		<Menu header={menuHeader} footer={menuFooter}>
			<Stack>
				<Text size="small" secondary>
					Last updated: {new Date(dateModified).toDateString()}
				</Text>
				<Text>{description}</Text>

				<Separator text="Fields" />

				{fields.map((field, i) => (
					<FieldPreview field={field} key={i} />
				))}
			</Stack>
		</Menu>
	);
};

export default ProgramPreview;
