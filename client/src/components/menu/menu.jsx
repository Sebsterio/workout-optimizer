import React from "react";
import "./menu.scss";

export const Menu = ({ children, compact }) => {
	let classes = "menu";
	if (compact) classes += " menu--compact";
	return <div className={classes}>{children}</div>;
};

export default Menu;
