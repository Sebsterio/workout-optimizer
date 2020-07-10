import React from "react";
import { connect } from "react-redux";

import { updateProgram, publishProgram } from "redux/program/program.actions";
import { openModal } from "redux/modal/modal.actions";

import ProgramMenu from "./program-menu";

const mapStateToProps = (state) => ({
	program: state.program,
});

const mapDispatchToProps = (dispatch) => ({
	updateProgram: (data) => dispatch(updateProgram(data)),
	publishProgram: () => dispatch(publishProgram()),
	openModal: (data) => dispatch(openModal(data)),
});

const ProgramMenuContainer = (props) => <ProgramMenu {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProgramMenuContainer);
