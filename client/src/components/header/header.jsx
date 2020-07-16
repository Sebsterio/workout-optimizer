import React from "react";
import { NavLink } from "react-router-dom";

import "./header.scss";

const Header = ({ routes }) => {
	return (
		<div className="header">
			<div className="header__wrap">
				<nav>
					{routes
						.filter((route) => route.inNavBar)
						.map((route) => (
							<NavLink className="nav-item" to={route.path} key={route.path}>
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
