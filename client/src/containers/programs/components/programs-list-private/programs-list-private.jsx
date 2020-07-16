import React, { useEffect } from "react";

import { Block, Spinner, Button } from "components";
import { ProgramSnippet } from "../index";

const ProgramsList = ({
	// parent
	editCurrentProgram,
	viewProgram,
	// redux
	currentProgram,
	programs,
	isDownloading,
	getPrograms,
}) => {
	useEffect(() => {
		if (!programs.length) getPrograms();
	}, [getPrograms]);

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
						key={program._id}
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
