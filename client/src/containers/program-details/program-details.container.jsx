import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getIsActivated } from "redux/program/program.selectors";
import { getIsSaved } from "redux/programs/programs.selectors";

import {
	saveFetchedProgram,
	activateSavedProgram,
	activateFetchedProgram,
} from "redux/programs/programs.operations";
import { closeModal } from "redux/modal/modal.actions";

import ProgramDetails from "./program-details";

const mapStateToProps = (state, props) => ({
	isActivated: getIsActivated(state, props.program),
	isSaved: getIsSaved(state, props.program),
});

const mapDispatchToProps = (dispatch, props) => ({
	save: () => dispatch(saveFetchedProgram(props.program)),
	activateSaved: () => dispatch(activateSavedProgram(props.program)),
	activateFetched: () => dispatch(activateFetchedProgram(props.program)),
	closeModal: () => dispatch(closeModal()),
});

const ProgramDetailsContainer = (props) => <ProgramDetails {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(ProgramDetailsContainer));
