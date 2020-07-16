import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getIsActivated } from "redux/program/program.selectors";
import { activateProgram } from "redux/program/program.operations";
import { closeModal } from "redux/modal/modal.actions";

import ProgramDetails from "./program-details";

const mapStateToProps = (state, props) => ({
	isActivated: getIsActivated(state, props.program),
});

const mapDispatchToProps = (dispatch, props) => ({
	closeModal: () => dispatch(closeModal()),
	activateProgram: () => dispatch(activateProgram(props.program)),
});

const ProgramDetailsContainer = (props) => <ProgramDetails {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(ProgramDetailsContainer));
