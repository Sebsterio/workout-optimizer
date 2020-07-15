import React from "react";
import { connect } from "react-redux";

import { removeProgram } from "redux/programs/programs.actions";
import { duplicateProgram } from "redux/program/program.actions";

import ProgramsSnippet from "./program-snippet";

const mapStateToProps = (state) => ({
	activeProgram: state.program,
});

const mapDispatchToProps = (dispatch, props) => ({
	remove: () => dispatch(removeProgram(props.program)),
	duplicate: () => dispatch(duplicateProgram(props.program)),
});

const ProgramsSnippetContainer = (props) => <ProgramsSnippet {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProgramsSnippetContainer);
