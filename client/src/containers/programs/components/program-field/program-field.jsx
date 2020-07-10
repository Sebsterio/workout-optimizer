import React from "react";
import { Button, Icon } from "components";
import "./program-field.scss";

const ProgramField = ({ field, openModal, updateProgram }) => {
	const { name, icon } = field;

	const handleEdit = () => openModal({ field, mode: "row" });

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
		<div className="program-field">
			<div className="program-field-col program-field-col--separated">
				{icon && (
					<div className="program-field-icon">
						<Icon {...icon} />
					</div>
				)}
				<div className="program-field-name">{name}</div>
			</div>

			<div className="program-field-col">
				<Button handler={handleEdit} text="Edit" />
			</div>

			<div className="program-field-col">
				<Button handler={handleDuplicate} text="Duplicate" />
				<Button handler={handleDelete} text="Delete" />
			</div>

			<div className="program-field-col">
				<Button text="Up" handler={() => handleMove("up")}></Button>
				<Button text="Down" handler={() => handleMove("down")}></Button>
			</div>
		</div>
	);
};

export default ProgramField;
