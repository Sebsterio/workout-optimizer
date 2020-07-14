import React from "react";
import { connect } from "react-redux";

import { getPublicPrograms } from "redux/programs/programs.actions";
import { activateProgram } from "redux/program/program.actions";

import ProgramsPage from "./programs.page";

const mapStateToProps = (state) => ({
	activeProgram: state.program,
	privatePrograms: state.programs.private,
	publicPrograms: state.programs.public,
	isDownloading: state.programs.downloading,
});

const mapDispatchToProps = (dispatch) => ({
	getPublicPrograms: (query) => dispatch(getPublicPrograms(query)),
	activateProgram: (newProgram) => dispatch(activateProgram(newProgram)),
});

const ProgramsPageContainer = (props) => <ProgramsPage {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProgramsPageContainer);
