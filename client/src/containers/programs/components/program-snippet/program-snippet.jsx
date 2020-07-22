import React from "react";

import { Block, Col, Text } from "components";

import { Button } from "components";

export const ProgramSnippet = ({
	// parent
	program,
	isFetched,
	programsLength,
	open,
	// redux
	isSaved,
	isActivated,
	activate,
	remove,
	duplicate,
}) => {
	const { id, name, author } = program;

	const isLastSavedProgram = id !== "standard" && programsLength === 1;
	const noSavedPrograms = id === "standard" && programsLength === 1;

	// Is in fetched array
	if (isFetched)
		return (
			<Block
				twoFields
				highlight={isActivated}
				greyedOut={isSaved || isActivated}
			>
				<Col>
					<Text>{name}</Text>
					<Text secondary>{author}</Text>
				</Col>

				<Button text="View" handler={open} />
			</Block>
		);

	// Is in saved array
	return (
		<Block threeFields highlight={isActivated}>
			<Text>{name}</Text>

			<Col>
				<Button
					text={isLastSavedProgram ? "Reset" : "Delete"}
					handler={remove}
					disabled={noSavedPrograms}
				/>
				<Button text="Duplicate" handler={duplicate} />
			</Col>

			<Col>
				<Button text="Edit" handler={open} />
				<Button text="Activate" handler={activate} disabled={isActivated} />
			</Col>
		</Block>
	);
};

export default ProgramSnippet;
