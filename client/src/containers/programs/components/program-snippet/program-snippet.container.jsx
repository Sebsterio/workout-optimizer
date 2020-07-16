import React from "react";
import { connect } from "react-redux";

import { getIsActivated } from "redux/program/program.selectors";
import {
	activateProgram,
	duplicateProgram,
} from "redux/program/program.operations";
import { removeProgram } from "redux/programs/programs.operations";

import ProgramsSnippet from "./program-snippet";

const mapStateToProps = (state, props) => ({
	isActivated: getIsActivated(state, props.program),
});

const mapDispatchToProps = (dispatch, props) => ({
	activate: () => dispatch(activateProgram(props.program)),
	remove: () => dispatch(removeProgram(props.program)),
	duplicate: () => dispatch(duplicateProgram(props.program)),
});

const ProgramsSnippetContainer = (props) => <ProgramsSnippet {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProgramsSnippetContainer);
