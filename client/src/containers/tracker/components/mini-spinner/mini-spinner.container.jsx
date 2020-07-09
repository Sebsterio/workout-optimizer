import React from "react";
import { connect } from "react-redux";

import MiniSpinner from "./mini-spinner.component";

const mapStateToProps = (state) => ({
	isLogSyncing: state.log.isSyncing,
	isLogSynced: state.log.isSynced,
	isProtocolSyncing: state.protocol.isSyncing,
	isProtocolSynced: state.protocol.isSynced,
});

const MiniSpinnerContainer = (props) => <MiniSpinner {...props} />;

export default connect(mapStateToProps)(MiniSpinnerContainer);
