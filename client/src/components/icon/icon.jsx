import React from "react";
import "./icon.scss";

export const Icon = ({ url, size }) => {
	const iconStyle = {
		backgroundImage: `url(${url})`,
		backgroundSize: size,
	};

	return <div className="icon" style={iconStyle}></div>;
};

export default Icon;
