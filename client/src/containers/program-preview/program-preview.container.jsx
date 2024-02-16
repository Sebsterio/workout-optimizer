import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { closeModal } from "state/modal/modal.actions";
import { activateProgram, saveFetchedProgram } from "state/programs/programs.operations";
import { getIsActivated, getIsSaved } from "state/programs/programs.selectors";

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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProgramPreviewContainer));
