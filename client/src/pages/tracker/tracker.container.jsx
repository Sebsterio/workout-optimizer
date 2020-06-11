import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectAreas } from "../../redux/protocol/protocol.selectors";

import TrackerPage from "./tracker.page";

const mapStateToProps = createStructuredSelector({
	areas: selectAreas,
	isModalOpen: (state) => state.modal.isOpen,
});

const TrackerPageContainer = (props) => <TrackerPage {...props} />;

export default connect(mapStateToProps)(TrackerPageContainer);
