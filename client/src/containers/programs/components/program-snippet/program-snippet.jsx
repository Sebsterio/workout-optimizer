import React from "react";

import { Block, Col, Row } from "components";

import { Button } from "components";

export const ProgramSnippet = ({ program, openProgram }) => (
	<Block wideFirstCol>
		<Col>
			<Row>{program.name}</Row>
		</Col>
		<Button text="Open" handler={openProgram} />
	</Block>
);

export default ProgramSnippet;
