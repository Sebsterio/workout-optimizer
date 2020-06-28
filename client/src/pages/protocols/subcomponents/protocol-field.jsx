import React from "react";
import Icon from "../../../components/icon/icon";

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
		<div className="protocols__field">
			<div className="protocols__field-col protocols__field-col--separated">
				{icon && (
					<div className="protocols__field-icon">
						<Icon {...icon} />
					</div>
				)}
				<div className="protocols__field-name">{name}</div>
			</div>

			<div className="protocols__field-col">
				<button className="protocols__field-btn" onClick={handleEdit}>
					Edit
				</button>
			</div>

			<div className="protocols__field-col">
				<button className="protocols__field-btn" onClick={handleDuplicate}>
					Duplicate
				</button>
				<button className="protocols__field-btn" onClick={handleDelete}>
					Delete
				</button>
			</div>

			<div className="protocols__field-col">
				<button
					className="protocols__field-btn"
					onClick={handleMove}
					data-direction="up"
				>
					Up
				</button>
				<button
					className="protocols__field-btn"
					onClick={handleMove}
					data-direction="down"
				>
					Down
				</button>
			</div>
		</div>
	);
};

export default ProtocolField;
