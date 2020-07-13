import React from "react";
import { Menu, Row, Button, Text, Separator } from "components";
import { FieldSnippet } from "../index";

const ProgramDetails = ({ program, goBack, activate }) => {
	const { name, description, fields, dateUpdated } = program;
	const fieldsArr = JSON.parse(fields);

	return (
		<Menu compact>
			<Row>
				<Button text="Back" handler={goBack} />
				<Button text="Activate" handler={activate} />
			</Row>

			<Separator text="Info" />

			<Text>name: {name}</Text>
			<Text>description: {description}</Text>
			<Text>dateUpdated: {new Date(dateUpdated).toDateString()}</Text>

			<Separator text="Fields" />

			{fieldsArr.map((field, i) => (
				<FieldSnippet field={field} key={i} />
			))}
		</Menu>
	);
};

export default ProgramDetails;
