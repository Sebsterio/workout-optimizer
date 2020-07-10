import React from "react";

import { Row } from "components";

import { Button } from "components";

export const ProgramSnippet = ({ program, openProgram }) => (
	<Row>
		{program.name}
		<Button text="Open" handler={openProgram} />
		<Button text="Duplicate" disabled />
	</Row>
);

export default ProgramSnippet;
