import React from "react";
import "./heading.scss";

export const Heading = ({ children, text }) => {
	return (
		<h1 className="heading">
			{text}
			{children}
		</h1>
	);
};

export default Heading;
