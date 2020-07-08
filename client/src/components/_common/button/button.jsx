import React from "react";
import "./button.scss";

export const Button = ({ text, children, handler, dataIndex }) => (
	<button className="button" onClick={handler} data-index={dataIndex}>
		{text && text}
		{children && children}
	</button>
);
