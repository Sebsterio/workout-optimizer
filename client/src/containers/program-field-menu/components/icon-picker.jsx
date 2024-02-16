import React from "react";

import { Icon } from "components";

import { fieldIcons } from "assets/icons";

import "./icon-picker.scss";

export const IconPicker = ({ icon, setIcon }) => {
	const getClass = (url) =>
		"icon-picker__icon" + (!!icon && icon.url === url ? " icon-picker__icon--selected" : "");

	return (
		<div className="icon-picker">
			{fieldIcons.map((icon) => (
				<div key={icon.url} className={getClass(icon.url)} onClick={() => setIcon(icon)}>
					<Icon {...icon} />
				</div>
			))}
		</div>
	);
};

export default IconPicker;
