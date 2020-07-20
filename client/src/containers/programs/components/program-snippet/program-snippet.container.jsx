import React from "react";
import { connect } from "react-redux";

// program
import {
	duplicateCurrentProgram,
	removeCurrentProgram,
} from "redux/program/program.operations";
import { getIsActivated } from "redux/program/program.selectors";

// programs
import {
	activateProgram,
	removeSavedProgram,
} from "redux/programs/programs.operations";
import { getIsSaved } from "redux/programs/programs.selectors";

// child
import ProgramsSnippet from "./program-snippet";

const mapStateToProps = (state, props) => ({
	isActivated: getIsActivated(state, props.program),
	isSaved: getIsSaved(state, props.program),
});

const mapDispatchToProps = (dispatch, props) => ({
	activate: () => dispatch(activateProgram(props.program)),
	duplicate: () => dispatch(duplicateCurrentProgram(props.program)),
	remove: () =>
		dispatch(
			props.isCurrent
				? removeCurrentProgram()
				: removeSavedProgram(props.program)
		),
});

const ProgramsSnippetContainer = (props) => <ProgramsSnippet {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProgramsSnippetContainer);
