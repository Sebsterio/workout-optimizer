import React from "react";
import { connect } from "react-redux";

import { getSavedPrograms } from "redux/programs/programs.operations";
import { openModal } from "redux/modal/modal.actions";

import ProgramsListSaved from "./programs-list-saved";

const mapStateToProps = (state) => ({
	currentProgram: state.program,
	programs: state.programs.saved,
	isDownloading: state.programs.downloading,
});
const mapDispatchToProps = (dispatch) => ({
	getPrograms: () => dispatch(getSavedPrograms()),
	openModal: (data) => dispatch(openModal(data)),
});

const ProgramsListSavedContainer = (props) => <ProgramsListSaved {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProgramsListSavedContainer);
