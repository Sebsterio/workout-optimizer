import React from "react";

import "./header.scss";

const Header = () => (
	<div className="header">
		<div className="header__wrap">
			<nav>
				<div className="nav-item">Schedule</div>
				<div className="nav-item">Protocols</div>
				<div className="nav-item">Statistics</div>
				<div className="nav-item">User</div>
				<div className="nav-item">Options</div>
				<div className="nav-item">Expand</div> {/* desktop only */}
			</nav>
		</div>
	</div>
);

export default Header;
