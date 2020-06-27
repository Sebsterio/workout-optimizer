import React from "react";
import "./separator.scss";

const Separator = ({ text }) => (
	<div className="separator">
		<div className="separator-line"></div>
		<span className="separator-text">{text}</span>
	</div>
);

export default Separator;
