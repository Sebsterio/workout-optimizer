import React from "react";
import { NavLink } from "react-router-dom";

import routes from "../../app/routes";

import "./header.scss";

const Header = (props) => {
	const expandView = () => {};

	return (
		<div className="header">
			<div className="header__wrap">
				<nav>
					{routes.map((route) => (
						<NavLink className="nav-item" to={route.path} key={route.name}>
							{route.name}
						</NavLink>
					))}
					{/* desktop only */}
					<div className="nav-item" onClick={expandView}>
						Expand
					</div>
				</nav>
			</div>
		</div>
	);
};

export default Header;
