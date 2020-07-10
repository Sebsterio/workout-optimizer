import React, { useState } from "react";
import { Page, Menu, Heading, Row, Button } from "components";

import { ProgramSnippet, ProgramMenu } from "./components";

const ProgramsPage = ({ program }) => {
	const [view, setView] = useState("private");
	const [currentProgram, setCurrentProgram] = useState(null);

	const programs = [program];

	return (
		<Page>
			{currentProgram ? (
				<ProgramMenu goBack={() => setCurrentProgram(null)} />
			) : (
				<Menu compact>
					<Heading text="Programs Page" />

					<Row>
						<Button text="Private" handler={() => setView("private")} />
						<Button text="Public" handler={() => setView("public")} />
					</Row>

					{view === "private" &&
						programs.map((program) => (
							<ProgramSnippet
								key={program.name}
								program={program}
								openProgram={() => setCurrentProgram(program)}
							/>
						))}

					{view === "public" && <div className="div">Coming Soon...</div>}
				</Menu>
			)}
		</Page>
	);
};

export default ProgramsPage;
