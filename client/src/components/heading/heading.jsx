import React from "react";
import "./heading.scss";

export const Heading = ({ children, text, small }) => {
	let classes = "heading";
	if (small) classes += " heading--small";

	return (
		<h2 className={classes}>
			{text}
			{children}
		</h2>
	);
};

export default Heading;
