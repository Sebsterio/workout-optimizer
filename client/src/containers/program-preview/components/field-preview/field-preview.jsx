import React from "react";
import { Snippet, Heading, Row, Stack, Table } from "components";

export const FieldPreview = ({ field }) => {
	const { levels, details, name } = field;

	return (
		<Snippet>
			<Stack>
				<Heading small text={name} />

				<Row center>
					<Table
						headCells={["Label", "Type", "Default"]}
						bodyRows={details.map((param) => {
							const { label, type, defaultVal } = param;
							if (label === "done") return null;
							return [label, type, defaultVal];
						})}
					/>
				</Row>

				<Row center>
					<Table
						headCells={["Label", "Intensity", "Recovery"]}
						bodyRows={levels.map((level, i) => {
							const { label, intensity, rest } = level;
							return [label, intensity, rest];
						})}
					/>
				</Row>
			</Stack>
		</Snippet>
	);
};
