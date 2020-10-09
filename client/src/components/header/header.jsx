import React from "react";
import { NavLink } from "react-router-dom";

import "./header.scss";

const Header = ({ routes }) => {
	return (
		<div className="header">
			<div className="header__wrap">
				<div className="header__logo">(Logo)</div>
				<nav className="header__nav">
					{routes
						.filter((route) => route.inNavBar)
						.map(({ path, icon, name }) => (
							<NavLink className="nav-link" to={path} key={path}>
								<img className="nav-link__icon" src={icon} alt={name} />
								<span className="nav-link__text">{name}</span>
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
