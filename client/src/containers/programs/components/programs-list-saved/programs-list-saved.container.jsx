import React from "react";
import { connect } from "react-redux";

import { openModal } from "redux/modal/modal.actions";

import ProgramsListSaved from "./programs-list-saved";

const mapStateToProps = (state) => ({
	currentProgram: state.program,
	programs: state.programs.saved,
});

const mapDispatchToProps = (dispatch) => ({
	openModal: (data) => dispatch(openModal(data)),
});

const ProgramsListSavedContainer = (props) => <ProgramsListSaved {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProgramsListSavedContainer);
