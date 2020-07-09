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

	const handleMove = (e) => {
		const direction = e.target.dataset.direction;
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
				<Button text="Up" data-direction="up" handler={handleMove}></Button>
				<Button text="Down" data-direction="down" handler={handleMove}></Button>
			</div>
		</div>
	);
};

export default ProtocolField;
