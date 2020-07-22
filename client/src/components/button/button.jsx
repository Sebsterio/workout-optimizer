import React from "react";
import { withRouter } from "react-router";
import "./button.scss";

export const Button = ({
	text,
	children,
	handler,
	data,
	disabled,
	active,
	to,
	history,
}) => {
	// button class name
	let classes = "button";
	if (active) classes += " button--active";

	// button element html attributes
	const attributes = {
		className: classes,
		onClick: to ? () => history.push(to) : handler,
	};
	if (disabled) attributes.disabled = true;
	if (data) attributes[`data-${data[0]}`] = data[1];
	return (
		<button {...attributes}>
			{text && text}
			{children && children}
		</button>
	);
};

export const LinkButton = withRouter(Button);
