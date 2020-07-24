import React from "react";
import { Button, Icon, Snippet, Col, Row } from "components";

export const ProgramFieldSnippet = ({
	program,
	field,
	openModal,
	modifyProgram,
}) => {
	const { name, icon } = field;

	const handleEdit = () =>
		openModal({ mode: "program-field", data: { program, field } });

	const handleDuplicate = () => {
		modifyProgram({ program, fieldToDuplicate: field });
	};

	const handleDelete = () => {
		modifyProgram({ program, fieldToDelete: field });
	};

	const handleMove = (direction) => {
		modifyProgram({ program, fieldToMove: { field, direction } });
	};

	return (
		<Snippet>
			<Col firstChildDominant>
				{icon && <Icon {...icon} />}
				<Row center>{name}</Row>
			</Col>

			<Col>
				<Button handler={handleDelete} text="Delete" />
				<Button handler={handleDuplicate} text="Duplicate" />
			</Col>

			<Col>
				<Button text="Up" handler={() => handleMove("up")}></Button>
				<Button text="Down" handler={() => handleMove("down")}></Button>
			</Col>

			<Col>
				<Button handler={handleEdit} text="Edit" />
			</Col>
		</Snippet>
	);
};
