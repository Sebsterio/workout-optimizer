import React from "react";
import { connect } from "react-redux";

import {
	getPublicPrograms,
	getPrivatePrograms,
} from "redux/programs/programs.operations";
import { activateProgram } from "redux/program/program.operations";

import ProgramsPage from "./programs.page";

const mapStateToProps = (state) => ({
	activeProgram: state.program,
	privatePrograms: state.programs.private,
	publicPrograms: state.programs.public,
	isDownloading: state.programs.downloading,
});

const mapDispatchToProps = (dispatch) => ({
	getPublicPrograms: (query) => dispatch(getPublicPrograms(query)),
	getPrivatePrograms: () => dispatch(getPrivatePrograms()),
	activateProgram: (newProgram) => dispatch(activateProgram(newProgram)),
});

const ProgramsPageContainer = (props) => <ProgramsPage {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProgramsPageContainer);
