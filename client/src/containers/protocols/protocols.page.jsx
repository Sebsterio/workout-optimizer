import React, { useState } from "react";
import { Page, Menu, Heading, Row, Button } from "components";

import { ProtocolSnippet, ProtocolMenu } from "./components";

const ProtocolsPage = ({ protocol }) => {
	const [view, setView] = useState("private");
	const [currentProtocol, setCurrentProtocol] = useState(null);

	const protocols = [protocol];

	return (
		<Page>
			{currentProtocol ? (
				<ProtocolMenu goBack={() => setCurrentProtocol(null)} />
			) : (
				<Menu compact>
					<Heading text="Protocols Page" />

					<Row>
						<Button text="Private" handler={() => setView("private")} />
						<Button text="Public" handler={() => setView("public")} />
					</Row>

					{view === "private" &&
						protocols.map((protocol) => (
							<ProtocolSnippet
								key={protocol.name}
								protocol={protocol}
								openProtocol={() => setCurrentProtocol(protocol)}
							/>
						))}

					{view === "public" && <div className="div">Coming Soon...</div>}
				</Menu>
			)}
		</Page>
	);
};

export default ProtocolsPage;
