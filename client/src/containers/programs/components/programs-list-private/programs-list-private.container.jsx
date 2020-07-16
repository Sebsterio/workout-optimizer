import React from "react";
import { connect } from "react-redux";

import { getPrivatePrograms } from "redux/programs/programs.operations";

import ProgramsPagePrivate from "./programs-list-private";

const mapStateToProps = (state) => ({
	currentProgram: state.program,
	programs: state.programs.private,
	isDownloading: state.programs.downloading,
});
const mapDispatchToProps = (dispatch) => ({
	getPrograms: () => dispatch(getPrivatePrograms()),
});

const ProgramsPagePrivateContainer = (props) => (
	<ProgramsPagePrivate {...props} />
);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProgramsPagePrivateContainer);
