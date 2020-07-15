import React from "react";

import { Block, Col, Text } from "components";

import { Button } from "components";

export const ProgramSnippet = ({ program, openProgram, isActive }) => (
	<Block wideFirstCol highlight={isActive}>
		<Col>
			<Text>{program.name}</Text>
			<Text secondary>{program.author}</Text>
		</Col>
		<Button text={isActive ? "Edit" : "View"} handler={openProgram} />
	</Block>
);

export default ProgramSnippet;
