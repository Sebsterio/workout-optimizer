import React from "react";
import { connect } from "react-redux";

import { openModal } from "redux/modal/modal.actions";

import ProgramsListSaved from "./programs-list-saved";

const mapStateToProps = (state) => ({
	// current program
	currentProgram: state.program,
	currentProgramisSyncing: state.program.isSyncing,

	// programs data
	programs: state.programs.saved,
	programsAreDownloading: state.programs.isDownloading,

	// programs list
	programsList: state.programsList.all,
	listIsSynced: state.programsList.isSynced,
	listIsSyncing: state.programsList.isSyncing,
});
const mapDispatchToProps = (dispatch) => ({
	openModal: (data) => dispatch(openModal(data)),
});

const ProgramsListSavedContainer = (props) => <ProgramsListSaved {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProgramsListSavedContainer);
