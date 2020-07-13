import React from "react";
import { Block, Heading, Row, Menu, Table } from "components";

const FieldSnippet = ({ field }) => {
	const { levels, details, name } = field;

	return (
		<Block oneField>
			<Menu>
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
			</Menu>
		</Block>
	);
};

export default FieldSnippet;
