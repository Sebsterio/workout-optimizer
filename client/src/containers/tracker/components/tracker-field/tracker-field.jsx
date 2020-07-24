import React from "react";
import Icon from "components/icon";
import "./tracker-field.scss";

export const TrackerField = ({ program, field, openModal }) => {
	const { icon, name } = field;

	let nameClass = "tracker-field__name";
	if (icon) nameClass += " tracker-field__name--small";

	return (
		<div
			className="tracker-field"
			onClick={() =>
				openModal({ mode: "program-field", data: { program, field } })
			}
		>
			{icon && (
				<div className="tracker-field__icon">
					<Icon {...icon} />
				</div>
			)}

			<div className={nameClass}>{name}</div>
		</div>
	);
};

export default TrackerField;
