import React from "react";
import { Button, Icon, Block, Col, Row } from "components";

const ProgramField = ({ field, openModal, updateCurrentProgram }) => {
	const { name, icon } = field;

	const handleEdit = () =>
		openModal({ mode: "program-field", data: { field } });

	const handleDuplicate = () => {
		updateCurrentProgram({ fieldToDuplicate: field });
	};

	const handleDelete = () => {
		updateCurrentProgram({ fieldToDelete: field });
	};

	const handleMove = (direction) => {
		updateCurrentProgram({ fieldToMove: { field, direction } });
	};

	return (
		<Block>
			<Col marginRight>
				{icon && <Icon {...icon} />}
				<Row center>{name}</Row>
			</Col>

			<Col>
				<Button handler={handleEdit} text="Edit" />
			</Col>

			<Col>
				<Button handler={handleDuplicate} text="Duplicate" />
				<Button handler={handleDelete} text="Delete" />
			</Col>

			<Col>
				<Button text="Up" handler={() => handleMove("up")}></Button>
				<Button text="Down" handler={() => handleMove("down")}></Button>
			</Col>
		</Block>
	);
};

export default ProgramField;
