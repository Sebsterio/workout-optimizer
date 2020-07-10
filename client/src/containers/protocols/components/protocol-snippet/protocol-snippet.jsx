import React from "react";

import { Row } from "components";

import { Button } from "components";

export const ProtocolSnippet = ({ protocol, openProtocol }) => (
	<Row>
		{protocol.name}
		<Button text="Open" handler={openProtocol} />
		<Button text="Duplicate" disabled />
	</Row>
);

export default ProtocolSnippet;
