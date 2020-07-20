import React from "react";

import { ProgramSnippet } from "../index";

const ProgramsList = ({
	// parent
	editCurrentProgram,
	// state
	currentProgram,
	programs,
	// dispatch
	openModal,
}) => {
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

			{programs.map((program) => (
				<ProgramSnippet
					key={program.id}
					program={program}
					open={() => viewProgram(program)}
				/>
			))}
		</>
	);
};

export default ProgramsList;
