import React from "react";

import { Stack, Block, Button, Spinner } from "components";

import { ProgramSnippet } from "../index";

const ProgramsList = ({ programs, editProgram }) => {
	return (
		<Stack compact>
			{programs.map((program) => (
				<ProgramSnippet
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
