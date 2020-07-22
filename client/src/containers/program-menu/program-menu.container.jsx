import React from "react";
import { connect } from "react-redux";

import { getEditedProgram } from "redux/programs/programs.selectors";

import {
	modifyProgram,
	publishProgram,
} from "redux/programs/programs.operations";
import { openModal } from "redux/modal/modal.actions";

import ProgramMenu from "./program-menu";

const mapStateToProps = (state) => ({
	program: getEditedProgram(state),
});

const mapDispatchToProps = (dispatch, props) => ({
	modify: (data) => dispatch(modifyProgram(data)),
	publish: () => dispatch(publishProgram(props.program)),
	openModal: (data) => dispatch(openModal(data)),
});

const ProgramMenuContainer = (props) => <ProgramMenu {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProgramMenuContainer);
