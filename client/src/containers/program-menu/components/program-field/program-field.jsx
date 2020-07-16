import React from "react";
import { Button, Icon, Block, Col, Row } from "components";

const ProgramField = ({ field, openModal, updateProgram }) => {
	const { name, icon } = field;

	const handleEdit = () => openModal({ mode: "row", data: { field } });

	const handleDuplicate = () => {
		updateProgram({ mode: "duplicate-field", field });
	};

	const handleDelete = () => {
		updateProgram({ mode: "delete-field", field });
	};

	const handleMove = (direction) => {
		updateProgram({ mode: "move-field", field, direction });
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
