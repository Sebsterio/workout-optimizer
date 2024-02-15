import React from "react";

import doneIcon from "assets/icons/ui/done.svg";
import notSyncedIcon from "assets/icons/ui/not_synced.svg";
import syncDisabledIcon from "assets/icons/ui/sync_disabled.svg";
import syncingIcon from "assets/icons/ui/syncing.svg";

import "./mini-spinner.scss";

const MiniSpinner = ({ isLogSyncing, isLogSynced, isIncognito }) => {
	// img attributes
	const [src, alt, modifier] = isIncognito
		? [syncDisabledIcon, "Sync disabled"]
		: isLogSynced
		? [doneIcon, "Log synced"]
		: isLogSyncing
		? [syncingIcon, "Log syncing", "spinning"]
		: [notSyncedIcon, "Log not synced"];

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
