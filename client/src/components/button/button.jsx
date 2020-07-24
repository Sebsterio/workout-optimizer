import React from "react";
import { withRouter } from "react-router";
import {
	getClassNamesFromProps,
	getAttributesFromProps,
} from "utils/component";
import "./button.scss";

export const Button = (props) => {
	const { text, children, handler, data, to, history } = props;

	const attributes = {
		onClick: to ? () => history.push(to) : handler,
		className: getClassNamesFromProps("button", props, ["active"]),
		...getAttributesFromProps(props, ["disabled"]),
	};

	if (data) attributes[`data-${data[0]}`] = data[1];

	return (
		<button {...attributes}>
			{text && text}
			{children && children}
		</button>
	);
};

export const LinkButton = withRouter(Button);
