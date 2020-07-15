import React from "react";

import { Block, Col, Text } from "components";

import { Button } from "components";

export const ProgramSnippet = ({
	program,
	isPublic,
	isActive,
	noPrivatePrograms,
	open,
	activate,
	remove,
	duplicate,
}) => {
	const { _id, name, author } = program;
	const isStandardProgram = !_id;
	const nothingToRemove = isStandardProgram && noPrivatePrograms;

	if (isPublic)
		return (
			<Block twoFields highlight={isActive}>
				<Col>
					<Text>{name}</Text>
					<Text secondary>{author}</Text>
				</Col>
				<Button text="View" handler={open} />
			</Block>
		);

	return (
		<Block threeFields highlight={isActive}>
			<Text>{name}</Text>

			<Col>
				<Button text="Delete" handler={remove} disabled={nothingToRemove} />
				<Button text="Duplicate" handler={duplicate} />
			</Col>

			{isActive ? (
				<Button text="Edit" handler={open} />
			) : (
				<Col>
					<Button text="Activate" handler={activate} />
					<Button text="View" handler={open} />
				</Col>
			)}
		</Block>
	);
};

export default ProgramSnippet;
