import React, { useEffect } from "react";

import { Menu, Block, Spinner } from "components";
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
		getPrograms();
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
		</>
	);
};

export default ProgramsList;
