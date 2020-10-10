import React from "react";

import syncingIcon from "assets/icons/syncing.svg";
import notSyncedIcon from "assets/icons/not_synced.svg";
import syncDisabledIcon from "assets/icons/sync_disabled.svg";
import doneIcon from "assets/icons/done.svg";

import "./mini-spinner.scss";

const MiniSpinner = ({ isLogSyncing, isLogSynced, isIncognito }) => {
	// img attributes
	const [src, alt, modifier] = isIncognito
		? [syncDisabledIcon, "Sync disabled"]
		: isLogSynced
		? [doneIcon, "Synced"]
		: isLogSyncing
		? [syncingIcon, "Syncing", "spinning"]
		: [notSyncedIcon, "Not synced"];

	const imgBaseClass = "mini-spinner__icon";
	const imgModClass = ` ${imgBaseClass}--${modifier}`;
	const imgClass = imgBaseClass + (modifier ? imgModClass : "");

	return (
		<div className="mini-spinner" onClick={() => alert(alt)}>
			<img {...{ src, alt }} className={imgClass} />
		</div>
	);
};

export default MiniSpinner;
