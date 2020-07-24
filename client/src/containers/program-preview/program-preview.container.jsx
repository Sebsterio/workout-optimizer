import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getIsSaved, getIsActivated } from "redux/programs/programs.selectors";

import {
	saveFetchedProgram,
	activateProgram,
} from "redux/programs/programs.operations";
import { closeModal } from "redux/modal/modal.actions";

import ProgramPreview from "./program-preview";

const mapStateToProps = (state, props) => ({
	isActivated: getIsActivated(state, props.program),
	isSaved: getIsSaved(state, props.program),
});

const mapDispatchToProps = (dispatch, props) => ({
	save: () => dispatch(saveFetchedProgram(props.program)),
	activate: () => dispatch(activateProgram(props.program)),
	closeModal: () => dispatch(closeModal()),
});

const ProgramPreviewContainer = (props) => <ProgramPreview {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(ProgramPreviewContainer));
