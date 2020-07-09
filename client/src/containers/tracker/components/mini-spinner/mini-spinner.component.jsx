import React from "react";

import "./mini-spinner.scss";

const MiniSpinner = ({
	isLogSyncing,
	isLogSynced,
	isProtocolSyncing,
	isProtocolSynced,
}) => {
	return (
		<div className="mini-spinner">
			{(isLogSyncing || isProtocolSyncing) && "Syncing..."}
			{isLogSynced && isProtocolSynced && "Synced"}
		</div>
	);
};

export default MiniSpinner;
