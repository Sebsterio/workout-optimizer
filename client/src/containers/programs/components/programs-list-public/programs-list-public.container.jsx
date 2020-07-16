import React from "react";
import { connect } from "react-redux";

import { getPublicPrograms } from "redux/programs/programs.operations";

import ProgramsPagePublic from "./programs-list-public";

const mapStateToProps = (state) => ({
	programs: state.programs.public,
	isDownloading: state.programs.downloading,
});

const mapDispatchToProps = (dispatch) => ({
	getPrograms: (query) => dispatch(getPublicPrograms(query)),
});

const ProgramsPagePublicContainer = (props) => (
	<ProgramsPagePublic {...props} />
);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProgramsPagePublicContainer);
