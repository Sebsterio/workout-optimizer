import React from "react";
import { connect } from "react-redux";

import { openModal } from "state/modal/modal.actions";
import { getCurrentProgram } from "state/programs/programs.selectors";

import TrackerField from "./tracker-field";

const mapStateToProps = (state) => ({
	program: getCurrentProgram(state),
});

const mapDispatchToProps = (dispatch) => ({
	openModal: (data) => dispatch(openModal(data)),
});

const TrackerFieldContainer = (props) => <TrackerField {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(TrackerFieldContainer);
