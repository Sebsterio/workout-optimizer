import React from "react";
import "./heading.scss";

export const Heading = ({ children, text, small }) => {
	let classes = "heading";
	if (small) classes += " heading--small";

	return (
		<h1 className={classes}>
			{text}
			{children}
		</h1>
	);
};

export default Heading;
