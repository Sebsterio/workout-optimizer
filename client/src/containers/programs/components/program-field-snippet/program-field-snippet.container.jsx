import React from "react";
import { connect } from "react-redux";

import {
	activateProgram,
	duplicateProgram,
	removeSavedProgram,
} from "redux/programs/programs.operations";
import { getIsSaved, getIsActivated } from "redux/programs/programs.selectors";

// child
import ProgramFieldSnippet from "./program-field-snippet";

const mapStateToProps = (state, props) => ({
	isActivated: getIsActivated(state, props.program),
	isSaved: getIsSaved(state, props.program),
});

const mapDispatchToProps = (dispatch, props) => ({
	activate: () => dispatch(activateProgram(props.program)),
	duplicate: () => dispatch(duplicateProgram(props.program)),
	remove: () => dispatch(removeSavedProgram(props.program)),
});

const ProgramFieldSnippetContainer = (props) => (
	<ProgramFieldSnippet {...props} />
);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProgramFieldSnippetContainer);
