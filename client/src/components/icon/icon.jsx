import React from "react";

import "./icon.scss";

const getScaleFromSize = (size) => {
	if (size.includes("%")) return Number(size.match(/\d+/)[0]) / 100;
	return size;
};

export const Icon = ({ url, size, name, alt = name ?? "icon" }) => {
	const iconStyle = {};
	if (size) iconStyle.transform = `scale(${getScaleFromSize(size)})`;

	return (
		<div className="icon">
			<img className="icon__img" src={url} alt={alt} style={iconStyle} />
		</div>
	);
};

export default Icon;
