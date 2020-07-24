import React from "react";
import { Redirect } from "react-router-dom";

import { Page, Menu, Stack, Button, Heading, Row } from "components";
import { ProgramsListSaved, ProgramsListFetched } from "./components";

const ProgramsPage = ({ match, history, setEditedProgram, clearError }) => {
	const { list } = match.params;

	if (!list) return <Redirect to="programs/private" />;

	const openPrivateList = () => {
		clearError();
		history.replace("/programs/private");
	};

	const openPublicList = () => {
		clearError();
		history.replace("/programs/public");
	};

	const editProgram = (program) => {
		clearError();
		setEditedProgram(program.id);
		history.push("/edit-program");
	};

	const menuHeader = (
		<Stack>
			<Heading text="Programs Page" />
			<Row>
				<Button
					text="Private"
					handler={openPrivateList}
					disabled={list === "private"}
				/>
				<Button
					text="Public"
					handler={openPublicList}
					disabled={list === "public"}
				/>
			</Row>
		</Stack>
	);

	return (
		<Page>
			<Menu header={menuHeader}>
				{list === "private" && <ProgramsListSaved editProgram={editProgram} />}
				{list === "public" && <ProgramsListFetched />}
			</Menu>
		</Page>
	);
};

export default ProgramsPage;
