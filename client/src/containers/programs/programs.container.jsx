import React from "react";
import { connect } from "react-redux";

import { activateProgram } from "redux/program/program.operations";
import { openModal, closeModal } from "redux/modal/modal.actions";

import ProgramsPage from "./programs.page";

const mapStateToProps = (state) => ({
	activeProgram: state.program,
});

const mapDispatchToProps = (dispatch) => ({
	openModal: (data) => dispatch(openModal(data)),
	closeModal: () => dispatch(closeModal()),
	activateProgram: (data) => dispatch(activateProgram(data)),
});

const ProgramsPageContainer = (props) => <ProgramsPage {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProgramsPageContainer);
