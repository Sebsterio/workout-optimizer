import React from "react";
import { connect } from "react-redux";

import {
	activateProgram,
	duplicateProgram,
	removeSavedProgram,
} from "redux/programs/programs.operations";
import { getIsSaved, getIsActivated } from "redux/programs/programs.selectors";

import ProgramSnippet from "./program-snippet";

const mapStateToProps = (state, props) => ({
	isActivated: getIsActivated(state, props.program),
	isSaved: getIsSaved(state, props.program),
});

const mapDispatchToProps = (dispatch, props) => ({
	activate: () => dispatch(activateProgram(props.program)),
	duplicate: () => dispatch(duplicateProgram(props.program)),
	remove: () => dispatch(removeSavedProgram(props.program)),
});

const ProgramSnippetContainer = (props) => <ProgramSnippet {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProgramSnippetContainer);
