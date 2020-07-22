import React from "react";
import { connect } from "react-redux";

import { getIsLogSyncing, getIsLogSynced } from "redux/log/log.selectors";
import {
	getIsCurrentProgramSyncing,
	getIsCurrentProgramSynced,
} from "redux/programs/programs.selectors";

import MiniSpinner from "./mini-spinner.component";

const mapStateToProps = (state) => ({
	isLogSyncing: getIsLogSyncing(state),
	isLogSynced: getIsLogSynced(state),
	isProgramSyncing: getIsCurrentProgramSyncing(state),
	isProgramSynced: getIsCurrentProgramSynced(state),
});

const MiniSpinnerContainer = (props) => <MiniSpinner {...props} />;

export default connect(mapStateToProps)(MiniSpinnerContainer);
