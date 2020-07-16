import React from "react";
import { Redirect } from "react-router-dom";

import { Page, Menu, Button, Heading, Row } from "components";
import { ProgramsListPrivate, ProgramsListPublic } from "./components";

const ProgramsPage = ({ match, history, activateProgram, openModal }) => {
	const { list } = match.params;

	if (!list) return <Redirect to="programs/private" />;

	// ------------------- handlers -------------------

	const openPrivateList = () => history.replace("/programs/private");

	const openPublicList = () => history.replace("/programs/public");

	const editCurrentProgram = () => history.push("/edit-program");

	const viewProgram = (program) =>
		openModal({ mode: "program", data: program });

	// ------------------- render -------------------

	return (
		<Page>
			<Menu compact>
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

				{list === "private" && (
					<ProgramsListPrivate
						editCurrentProgram={editCurrentProgram}
						viewProgram={viewProgram}
					/>
				)}

				{list === "public" && <ProgramsListPublic viewProgram={viewProgram} />}
			</Menu>
		</Page>
	);
};

export default ProgramsPage;
