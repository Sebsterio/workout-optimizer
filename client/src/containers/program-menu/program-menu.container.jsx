import React from "react";
import { connect } from "react-redux";

import {
	updateCurrentProgram,
	publishCurrentProgram,
} from "redux/program/program.operations";
import { openModal } from "redux/modal/modal.actions";

import ProgramMenu from "./program-menu";

const mapStateToProps = (state) => ({
	program: state.program,
});

const mapDispatchToProps = (dispatch) => ({
	updateCurrentProgram: (data) => dispatch(updateCurrentProgram(data)),
	publishCurrentProgram: () => dispatch(publishCurrentProgram()),
	openModal: (data) => dispatch(openModal(data)),
});

const ProgramMenuContainer = (props) => <ProgramMenu {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProgramMenuContainer);
