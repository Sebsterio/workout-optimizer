import React, { useState } from "react";
import { Page, Menu, Heading, Row, Block, Button, Spinner } from "components";
import { ProgramSnippet, ProgramMenu, ProgramDetails } from "./components";

const ProgramsPage = ({
	activeProgram,
	privatePrograms,
	publicPrograms,
	isDownloading,
	getPublicPrograms,
	getPrivatePrograms,
	activateProgram,
}) => {
	const [view, setView] = useState("private");
	const [programViewed, setProgramViewed] = useState(null);
	const [editingActiveProgram, setEditingActiveProgram] = useState(false);

	// --------------- program lists ---------------

	const showPrivatePrograms = () => {
		getPrivatePrograms();
		setView("private");
	};

	const showPublicPrograms = () => {
		setView("public");
		getPublicPrograms();
	};

	// TODO: pagination
	const getMorePrograms = () => {
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
		setProgramViewed(program);
		setEditingActiveProgram(false);
	};

	const stopViewingProgram = () => {
		setProgramViewed(null);
	};

	const handleActivate = (program) => {
		activateProgram(program);
		setProgramViewed(null);
		setView("private");
	};

	// ------------------- render -------------------

	return (
		<Page>
			{
				// Edit active program
				editingActiveProgram ? (
					<ProgramMenu goBack={stopEditingActiveProgram} />
				) : // View non-active program
				programViewed ? (
					<ProgramDetails
						program={programViewed}
						activate={() => handleActivate(programViewed)}
						goBack={stopViewingProgram}
						isActive={programViewed._id === activeProgram._id}
					/>
				) : (
					// Lists of programs
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
									noPrivatePrograms={!privatePrograms.length}
									program={activeProgram}
									open={editActiveProgram}
								/>
								{isDownloading ? (
									<Block>
										<Spinner />
									</Block>
								) : (
									privatePrograms.map((program) => (
										<ProgramSnippet
											key={program._id}
											program={program}
											open={() => viewProgram(program)}
											activate={() => handleActivate(program)}
										/>
									))
								)}
							</>
						)}

						{view === "public" && (
							<>
								{publicPrograms.map((program) => (
									<ProgramSnippet
										isPublic
										isActive={program._id === activateProgram._id}
										key={program._id}
										program={program}
										open={() => viewProgram(program)}
										activate={() => handleActivate(program)}
									/>
								))}
								{isDownloading ? (
									<Block>
										<Spinner />
									</Block>
								) : (
									<Button text="More" handler={getMorePrograms} />
								)}
							</>
						)}
					</Menu>
				)
			}
		</Page>
	);
};

export default ProgramsPage;
