import React from "react";
import { icons } from "./icons";

const IconPicker = ({ icon, setIcon }) => {
	const getStyle = (url, size) => ({
		backgroundImage: `url(${url})`,
		backgroundSize: size,
	});
	const getClass = (id) =>
		"icon-picker__icon" +
		(!!icon && id === icon.id ? " icon-picker__icon--selected" : "");

	return (
		<div className="icon-picker">
			{icons.map(({ id, url, size }) => (
				<div
					key={id}
					className={getClass(id)}
					style={getStyle(url, size)}
					onClick={() => setIcon({ id, url, size })}
				></div>
			))}
		</div>
	);
};

export default IconPicker;
