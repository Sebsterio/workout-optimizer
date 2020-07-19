import React from "react";

import { Block, Col, Text } from "components";

import { Button } from "components";

export const ProgramSnippet = ({
	// parent
	program,
	isCurrent,
	isFetched,
	noPrivatePrograms,
	open,
	// redux
	isSaved,
	isActivated,
	activateSaved,
	remove,
	duplicate,
}) => {
	const { id, name, author } = program;

	const isStandardProgram = !id || id === "standard";
	const nothingToRemove = isStandardProgram && noPrivatePrograms;

	// Is in fetched array
	if (isFetched)
		return (
			<Block twoFields highlight={isActivated} greyedOut={isSaved}>
				<Col>
					<Text>{name}</Text>
					<Text secondary>{author}</Text>
				</Col>

				<Button text="View" handler={open} />
			</Block>
		);

	// Is in saved array OR is current
	return (
		<Block threeFields highlight={isCurrent}>
			<Text>{name}</Text>

			<Col>
				<Button text="Delete" handler={remove} disabled={nothingToRemove} />

				{isCurrent ? (
					<Button text="Duplicate" handler={duplicate} />
				) : (
					<Button text="Activate" handler={activateSaved} />
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
