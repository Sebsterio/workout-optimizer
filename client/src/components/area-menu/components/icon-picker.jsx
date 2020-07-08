import React from "react";
import Icon from "../../icon/icon";
import { icons } from "../../../assets";

export const IconPicker = ({ icon, setIcon }) => {
	const getClass = (url) =>
		"icon-picker__icon" +
		(!!icon && icon.url === url ? " icon-picker__icon--selected" : "");

	return (
		<div className="icon-picker">
			{icons.map((icon) => (
				<div
					key={icon.url}
					className={getClass(icon.url)}
					onClick={() => setIcon(icon)}
				>
					<Icon {...icon} />
				</div>
			))}
		</div>
	);
};

export default IconPicker;
