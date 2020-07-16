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

	// Is on public list
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

	// Is on private list OR is current
	return (
		<Block threeFields highlight={isActive}>
			<Text>{name}</Text>

			<Col>
				<Button text="Delete" handler={remove} disabled={nothingToRemove} />

				{isActive ? (
					<Button text="Duplicate" handler={duplicate} />
				) : (
					<Button text="Activate" handler={activate} />
				)}
			</Col>

			{isActive ? (
				<Button text="Edit" handler={open} />
			) : (
				<Button text="View" handler={open} />
			)}
		</Block>
	);
};

export default ProgramSnippet;
