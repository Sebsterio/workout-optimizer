import React from "react";
import { Button, Icon } from "components";
import "./protocol-field.scss";

const ProtocolField = ({ field, openModal, updateProtocol }) => {
	const { name, icon } = field;

	const handleEdit = () => openModal({ field, mode: "row" });

	const handleDuplicate = () => {
		updateProtocol({ mode: "duplicate-field", field });
	};

	const handleDelete = () => {
		updateProtocol({ mode: "delete-field", field });
	};

	const handleMove = (direction) => {
		updateProtocol({ mode: "move-field", field, direction });
	};

	return (
		<div className="protocol-field">
			<div className="protocol-field-col protocol-field-col--separated">
				{icon && (
					<div className="protocol-field-icon">
						<Icon {...icon} />
					</div>
				)}
				<div className="protocol-field-name">{name}</div>
			</div>

			<div className="protocol-field-col">
				<Button handler={handleEdit} text="Edit" />
			</div>

			<div className="protocol-field-col">
				<Button handler={handleDuplicate} text="Duplicate" />
				<Button handler={handleDelete} text="Delete" />
			</div>

			<div className="protocol-field-col">
				<Button text="Up" handler={() => handleMove("up")}></Button>
				<Button text="Down" handler={() => handleMove("down")}></Button>
			</div>
		</div>
	);
};

export default ProtocolField;
