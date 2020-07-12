import React from "react";
import { connect } from "react-redux";

import TrackerPage from "./tracker.page";

const mapStateToProps = (state) => ({
	// cellSize: state.settings.cellSize,
	cellSize: 90,
});

const TrackerPageContainer = (props) => <TrackerPage {...props} />;

export default connect(mapStateToProps)(TrackerPageContainer);
