import React from "react";

import { Block, Col, Text } from "components";

import { Button } from "components";

export const ProgramSnippet = ({
	// parent
	program,
	isCurrent,
	isPublic,
	noPrivatePrograms,
	open,
	// redux
	isActivated,
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
			<Block twoFields highlight={isActivated}>
				<Col>
					<Text>{name}</Text>
					<Text secondary>{author}</Text>
				</Col>

				<Button text="View" handler={open} />
			</Block>
		);

	// Is on private list OR is current
	return (
		<Block threeFields highlight={isCurrent}>
			<Text>{name}</Text>

			<Col>
				<Button text="Delete" handler={remove} disabled={nothingToRemove} />

				{isCurrent ? (
					<Button text="Duplicate" handler={duplicate} />
				) : (
					<Button text="Activate" handler={activate} />
				)}
			</Col>

			{isCurrent ? (
				<Button text="Edit" handler={open} />
			) : (
				<Button text="View" handler={open} />
			)}
		</Block>
	);
};

export default ProgramSnippet;
