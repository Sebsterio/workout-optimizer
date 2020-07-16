import React from "react";
import Icon from "components/icon";
import "./side-field.scss";

export const SideField = ({ field, openModal }) => {
	const { icon, name } = field;

	let nameClass = "side-field__name";
	if (icon) nameClass += " side-field__name--small";

	return (
		<div
			className="side-field"
			onClick={() => openModal({ mode: "row", data: { field } })}
		>
			{icon && (
				<div className="side-field__icon">
					<Icon {...icon} />
				</div>
			)}

			<div className={nameClass}>{name}</div>
		</div>
	);
};

export default SideField;
