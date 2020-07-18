import React from "react";
import { connect } from "react-redux";
import { updateCurrentProgram } from "redux/program/program.operations";
import ProgramFieldMenu from "./program-field-menu";

const mapStateToProps = (state) => ({
	fields: state.program.fields,
});

const mapDispatchToProps = (dispatch) => ({
	updateCurrentProgram: (data) => dispatch(updateCurrentProgram(data)),
});

const ProgramFieldMenuContainer = (props) => <ProgramFieldMenu {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProgramFieldMenuContainer);
