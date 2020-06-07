import React from "react";
import { NavLink } from "react-router-dom";

import "./header.scss";

const Header = (props) => {
	const { main, protocols, statistics, user, options } = props.routes;
	const expandView = () => {};

	return (
		<div className="header">
			<div className="header__wrap">
				<nav>
					<NavLink className="nav-item" to={main}>
						Schedule
					</NavLink>
					<NavLink className="nav-item" to={protocols}>
						Protocols
					</NavLink>
					<NavLink className="nav-item" to={statistics}>
						Statistics
					</NavLink>
					<NavLink className="nav-item" to={user}>
						User
					</NavLink>
					<NavLink className="nav-item" to={options}>
						Options
					</NavLink>
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
