import React, { useEffect } from "react";

import { Block, Button, Spinner } from "components";
import { ProgramSnippet } from "../index";

const ProgramsList = ({
	// parent
	viewProgram,
	// redux
	programs,
	isDownloading,
	getPrograms,
}) => {
	useEffect(() => {
		if (!programs.length) getPrograms();
	}, [programs, getPrograms]);

	return (
		<>
			{programs.map((program) => {
				return (
					<ProgramSnippet
						isPublic
						key={program._id}
						program={program}
						open={() => viewProgram(program)}
					/>
				);
			})}

			{isDownloading ? (
				<Block>
					<Spinner />
				</Block>
			) : (
				<Button text="More" handler={getPrograms} />
			)}
		</>
	);
};

export default ProgramsList;
