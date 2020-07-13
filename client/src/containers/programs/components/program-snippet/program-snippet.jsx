import React from "react";

import { Block, Col, Row } from "components";

import { Button } from "components";

export const ProgramSnippet = ({ program, openProgram, isActive }) => (
	<Block wideFirstCol highlight={isActive}>
		<Col>
			<Row>{program.name}</Row>
		</Col>
		<Button text={isActive ? "Edit" : "View"} handler={openProgram} />
	</Block>
);

export default ProgramSnippet;
