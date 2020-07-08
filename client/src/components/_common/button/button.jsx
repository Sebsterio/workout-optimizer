import React from "react";
import "./button.scss";

export const Button = ({ text, children, handler, data }) => {
	const attributes = {
		className: "button",
		onClick: handler,
	};

	if (data) attributes[`data-${data[0]}`] = data[1];

	return (
		<button {...attributes}>
			{text && text}
			{children && children}
		</button>
	);
};
