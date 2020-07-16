import React, { useState, useEffect } from "react";
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

	useEffect(() => {
		getPrivatePrograms();
	}, [getPrivatePrograms]);

	// --------------- program lists ---------------

	const showPrivatePrograms = () => {
		setView("private");
	};

	const showPublicPrograms = () => {
		setView("public");
		getPublicPrograms();
	};

	const getMorePrograms = () => {
		// TODO: pagination
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

	const isViewedActive = programViewed
		? programViewed._id === activeProgram._id
		: null;
	const isViewedDownloaded = false; // <<<< TEMP

	return (
		<Page>
			{editingActiveProgram ? (
				// Edit active program
				<ProgramMenu goBack={stopEditingActiveProgram} />
			) : programViewed ? (
				// View non-active program
				<ProgramDetails
					program={programViewed}
					isActive={isViewedActive}
					isDownloaded={isViewedDownloaded}
					activate={() => handleActivate(programViewed)}
					goBack={stopViewingProgram}
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
							{publicPrograms.map((program) => {
								const isActive = program._id === activeProgram._id;
								const isDownloaded = false; // <<<< TEMP
								return (
									<ProgramSnippet
										isPublic
										isActive={isActive}
										isDownloaded={isDownloaded}
										key={program._id}
										program={program}
										open={() => viewProgram(program)}
										activate={() => handleActivate(program)}
									/>
								);
							})}
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
			)}
		</Page>
	);
};

export default ProgramsPage;
