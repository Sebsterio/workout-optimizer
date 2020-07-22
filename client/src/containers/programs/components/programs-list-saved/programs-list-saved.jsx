import React from "react";

import { ProgramSnippet } from "../index";

const ProgramsList = ({ programs, editProgram }) => {
	return programs.map((program) => (
		<ProgramSnippet
			key={program.id}
			program={program}
			programsLength={programs.length}
			open={() => editProgram(program)}
		/>
	));
};

export default ProgramsList;
