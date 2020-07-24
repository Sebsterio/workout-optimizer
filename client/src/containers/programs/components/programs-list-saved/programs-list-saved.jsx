import React from "react";

import { Stack } from "components";

import { ProgramFieldSnippet } from "../index";

const ProgramsList = ({ programs, editProgram }) => {
	return (
		<Stack compact>
			{programs.map((program) => (
				<ProgramFieldSnippet
					key={program.id}
					program={program}
					programsLength={programs.length}
					open={() => editProgram(program)}
				/>
			))}
		</Stack>
	);
};

export default ProgramsList;
