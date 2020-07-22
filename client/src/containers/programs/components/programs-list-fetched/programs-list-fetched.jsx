import React, { useEffect } from "react";

import { Stack, Block, Button, Spinner } from "components";
import { ProgramSnippet } from "../index";

const ProgramsList = ({
	// redux
	programs,
	downloading,
	getPrograms,
	openModal,
}) => {
	// Fetch public programs if not already fetched
	useEffect(() => {
		if (!programs.length) getPrograms();
	}, [programs, getPrograms]);

	const viewProgram = (program) =>
		openModal({ mode: "program", data: program });

	return (
		<Stack compact>
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

			{downloading ? (
				<Block>
					<Spinner />
				</Block>
			) : (
				<Button text="More" handler={getPrograms} />
			)}
		</Stack>
	);
};

export default ProgramsList;
