import React, { useState } from "react";
import { Page, Menu, Heading, Row, Block, Button, Spinner } from "components";

import { ProgramSnippet, ProgramMenu } from "./components";

const ProgramsPage = ({
	privatePrograms,
	publicPrograms,
	getPublicPrograms,
}) => {
	const [view, setView] = useState("private");
	const [currentProgram, setCurrentProgram] = useState(null);

	const showPrivatePrograms = () => setView("private");
	const showPublicPrograms = () => {
		setView("public");
		getPublicPrograms();
		console.log(publicPrograms);
	};

	return (
		<Page>
			{currentProgram ? (
				<ProgramMenu goBack={() => setCurrentProgram(null)} />
			) : (
				<Menu compact>
					<Heading text="Programs Page" />

					<Row>
						<Button text="Private" handler={showPrivatePrograms} />
						<Button text="Public" handler={showPublicPrograms} />
					</Row>

					{view === "private" &&
						privatePrograms.map((program) => (
							<ProgramSnippet
								key={program.name}
								program={program}
								openProgram={() => setCurrentProgram(program)}
							/>
						))}

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
									openProgram={() => setCurrentProgram(program)}
								/>
							))
						))}
				</Menu>
			)}
		</Page>
	);
};

export default ProgramsPage;
