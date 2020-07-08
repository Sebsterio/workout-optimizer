import React from "react";

import "./mini-spinner.scss";

const LogSpinner = ({
	isLogSyncing,
	isLogSynced,
	isProtocolSyncing,
	isProtocolSynced,
}) => {
	return (
		<div className="log-spinner">
			{(isLogSyncing || isProtocolSyncing) && "Syncing..."}
			{isLogSynced && isProtocolSynced && "Synced"}
		</div>
	);
};

export default LogSpinner;
