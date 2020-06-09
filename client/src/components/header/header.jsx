import React from "react";
import { NavLink } from "react-router-dom";

import routes from "../../app/routes";

import "./header.scss";

const Header = (props) => {
	return (
		<div className="header">
			<div className="header__wrap">
				<nav>
					{routes.map((route) => (
						<NavLink className="nav-item" to={route.path} key={route.name}>
							{route.name}
						</NavLink>
						// add label; hidden except when navLink active
					))}
					{/* desktop only */}
				</nav>
			</div>
		</div>
	);
};

export default Header;
