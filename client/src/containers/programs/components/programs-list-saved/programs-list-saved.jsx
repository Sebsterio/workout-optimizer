import React from "react";

import { Block, Spinner, Button } from "components";
import { ProgramSnippet } from "../index";

const ProgramsList = ({
	// --- parent ---
	editCurrentProgram,
	// --- redux ---
	// programs list
	listIsSyncing,
	// current program
	currentProgram,
	currentProgramisSyncing,
	// programs data
	programs,
	programsAreDownloading,
	// dispatch
	getPrograms,
	openModal,
}) => {
	// TODO: download programs data once programs-list has synced

	const viewProgram = (program) =>
		openModal({ mode: "program", data: program });

	if (listIsSyncing) return <Spinner />;

	return (
		<>
			{currentProgramisSyncing ? (
				<Block highlight>
					<Spinner />
				</Block>
			) : (
				<ProgramSnippet
					isCurrent
					program={currentProgram}
					open={editCurrentProgram}
					noPrivatePrograms={!programs.length}
				/>
			)}

			{programsAreDownloading ? (
				<Block>
					<Spinner />
				</Block>
			) : (
				<>
					{programs.map((program) => (
						<ProgramSnippet
							key={program.id}
							program={program}
							open={() => viewProgram(program)}
						/>
					))}
					<Button text="Refresh" handler={getPrograms} />
				</>
			)}
		</>
	);
};

export default ProgramsList;
