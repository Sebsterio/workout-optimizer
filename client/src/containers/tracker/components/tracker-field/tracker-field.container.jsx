import React from "react";
import { connect } from "react-redux";
import { getCurrentProgram } from "redux/programs/programs.selectors";
import { openModal } from "redux/modal/modal.actions";

import TrackerField from "./tracker-field";

const mapStateToProps = (state) => ({
	program: getCurrentProgram(state),
});

const mapDispatchToProps = (dispatch) => ({
	openModal: (data) => dispatch(openModal(data)),
});

const TrackerFieldContainer = (props) => <TrackerField {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TrackerFieldContainer);
