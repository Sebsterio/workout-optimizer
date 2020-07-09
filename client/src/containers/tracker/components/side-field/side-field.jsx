import React from "react";
import Icon from "components/icon";
import "./side-field.scss";

export const SideField = ({ field, openModal }) => {
	const { icon, name } = field;

	return (
		<div
			className="side-field"
			field={field}
			onClick={() => openModal({ field, mode: "row" })}
		>
			{icon ? (
				<>
					<div className="side-field__icon">
						<Icon {...icon} />
					</div>
					<div className="side-field__name side-field__name--small">{name}</div>
				</>
			) : (
				<div className="side-field__name">{name}</div>
			)}
		</div>
	);
};

export default SideField;
