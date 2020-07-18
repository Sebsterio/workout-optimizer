import React, { useEffect } from "react";

import { Block, Button, Spinner } from "components";
import { ProgramSnippet } from "../index";

const ProgramsList = ({
	// redux
	programs,
	isDownloading,
	getPrograms,
	openModal,
}) => {
	useEffect(() => {
		if (!programs.length) getPrograms();
	}, [programs, getPrograms]);

	const viewProgram = (program) =>
		openModal({ mode: "program", data: program });

	return (
		<>
			{programs.map((program) => {
				return (
					<ProgramSnippet
						isFetched
						key={program.id}
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
