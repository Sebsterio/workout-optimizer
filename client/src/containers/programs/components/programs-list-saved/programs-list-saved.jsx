import React, { useState, useEffect } from "react";

import { Block, Spinner, Button } from "components";
import { ProgramSnippet } from "../index";

const ProgramsList = ({
	// parent
	editCurrentProgram,
	// redux
	currentProgram,
	programs,
	isDownloading,
	getPrograms,
	openModal,
}) => {
	const [hasRendered, setHasRendered] = useState(false);

	useEffect(() => {
		if (!hasRendered) getPrograms();
		setHasRendered(true);
	}, [getPrograms, hasRendered, setHasRendered]);

	const viewProgram = (program) =>
		openModal({ mode: "program", data: program });

	return (
		<>
			<ProgramSnippet
				isCurrent
				program={currentProgram}
				open={editCurrentProgram}
				noPrivatePrograms={!programs.length}
			/>

			{isDownloading ? (
				<Block>
					<Spinner />
				</Block>
			) : (
				programs.map((program) => (
					<ProgramSnippet
						key={program.id}
						program={program}
						open={() => viewProgram(program)}
					/>
				))
			)}
			<Button text="Refresh" handler={getPrograms} />
		</>
	);
};

export default ProgramsList;
