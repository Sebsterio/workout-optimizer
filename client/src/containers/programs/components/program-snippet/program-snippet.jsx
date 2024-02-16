import React from "react";

import { Col, Snippet, Text } from "components";
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
			<Snippet highlight={isActivated} greyedOut={isSaved || isActivated}>
				<Col>
					<Text>{name}</Text>
					<Text secondary>{author}</Text>
				</Col>

				<Button text="View" handler={open} />
			</Snippet>
		);

	// Is in saved array
	return (
		<Snippet highlight={isActivated}>
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
		</Snippet>
	);
};

export default ProgramSnippet;
