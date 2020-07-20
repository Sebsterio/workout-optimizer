import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getIsActivated } from "redux/program/program.selectors";
import { getIsSaved } from "redux/programs/programs.selectors";

import {
	saveFetchedProgram,
	activateProgram,
} from "redux/programs/programs.operations";
import { closeModal } from "redux/modal/modal.actions";

import ProgramDetails from "./program-details";

const mapStateToProps = (state, props) => ({
	isActivated: getIsActivated(state, props.program),
	isSaved: getIsSaved(state, props.program),
});

const mapDispatchToProps = (dispatch, props) => ({
	save: () => dispatch(saveFetchedProgram(props.program)),
	activate: () => dispatch(activateProgram(props.program)),
	closeModal: () => dispatch(closeModal()),
});

const ProgramDetailsContainer = (props) => <ProgramDetails {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(ProgramDetailsContainer));
