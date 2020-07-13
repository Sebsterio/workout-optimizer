import React, { useState } from "react";
import { Page, Menu, Heading, Row, Block, Button, Spinner } from "components";

import { ProgramSnippet, ProgramMenu, ProgramDetails } from "./components";

const ProgramsPage = ({
	activeProgram,
	privatePrograms,
	publicPrograms,
	getPublicPrograms,
	activateProgram,
}) => {
	const [view, setView] = useState("private");
	const [programViewed, setProgramViewed] = useState(null);
	const [editingActiveProgram, setEditingActiveProgram] = useState(false);

	// --------------- program lists ---------------

	const showPrivatePrograms = () => {
		// TODO: updatePrivatePrograms() - GET remote if more recent than local
		setView("private");
	};

	const showPublicPrograms = () => {
		setView("public");
		getPublicPrograms();
	};

	// --------------- active program ---------------

	const editActiveProgram = () => {
		setEditingActiveProgram(true);
		setProgramViewed(null);
	};

	const stopEditingActiveProgram = () => {
		setEditingActiveProgram(false);
	};

	// --------------- other programs ---------------

	const viewProgram = (program) => {
		setEditingActiveProgram(false);
		setProgramViewed(program);
	};

	const stopViewingProgram = () => {
		setProgramViewed(null);
	};

	const handleActivate = () => {
		activateProgram(programViewed);
		setProgramViewed(null);
		setView("private");
	};

	// ------------------- render -------------------

	return (
		<Page>
			{editingActiveProgram ? (
				<ProgramMenu goBack={stopEditingActiveProgram} />
			) : programViewed ? (
				<ProgramDetails
					program={programViewed}
					activate={handleActivate}
					goBack={stopViewingProgram}
				/>
			) : (
				<Menu compact>
					<Heading text="Programs Page" />

					<Row>
						<Button
							text="Private"
							handler={showPrivatePrograms}
							disabled={view === "private"}
						/>
						<Button
							text="Public"
							handler={showPublicPrograms}
							disabled={view === "public"}
						/>
					</Row>

					{view === "private" && (
						<>
							<ProgramSnippet
								isActive
								program={activeProgram}
								openProgram={editActiveProgram}
							/>
							{privatePrograms.map((program) => (
								<ProgramSnippet
									key={program.name}
									program={program}
									openProgram={() => viewProgram(program)}
								/>
							))}
						</>
					)}

					{view === "public" &&
						(!publicPrograms.length ? (
							<Block>
								<Spinner />
							</Block>
						) : (
							publicPrograms.map((program) => (
								<ProgramSnippet
									key={program.name}
									program={program}
									openProgram={() => viewProgram(program)}
								/>
							))
						))}
				</Menu>
			)}
		</Page>
	);
};

export default ProgramsPage;
