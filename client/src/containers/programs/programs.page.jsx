import React from "react";
import { Redirect } from "react-router-dom";

import { Page, Menu, Button, Heading, Row } from "components";
import { ProgramsListSaved, ProgramsListFetched } from "./components";

const ProgramsPage = ({ match, history, clearError }) => {
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

	const editCurrentProgram = () => {
		clearError();
		history.push("/edit-program");
	};

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
					<ProgramsListSaved editCurrentProgram={editCurrentProgram} />
				)}

				{list === "public" && <ProgramsListFetched />}
			</Menu>
		</Page>
	);
};

export default ProgramsPage;
