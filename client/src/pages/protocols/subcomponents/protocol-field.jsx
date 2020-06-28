import React from "react";
import Icon from "../../../components/icon/icon";

const ProtocolField = ({ field, openModal }) => {
	const { name, icon } = field;

	const handleEdit = () => openModal({ field, mode: "row" });

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
				<button className="protocols__field-btn">Duplicate</button>
				<button className="protocols__field-btn">Delete</button>
			</div>

			<div className="protocols__field-col">
				<button className="protocols__field-btn">Up</button>
				<button className="protocols__field-btn">Down</button>
			</div>
		</div>
	);
};

export default ProtocolField;
