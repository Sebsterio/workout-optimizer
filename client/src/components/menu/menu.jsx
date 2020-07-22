import React from "react";
import "./menu.scss";

// Grows vertically, limited height
// Has a header & footer
// Content Y-scrollable

export const Menu = ({ header, footer, children }) => {
	return (
		<div className="menu">
			<div className="menu__header">{header}</div>
			<div className="menu__content">{children}</div>
			<div className="menu__footer">{footer}</div>
		</div>
	);
};

export default Menu;
