import React from "react";
import { connect } from "react-redux";

import ProgramsPage from "./programs.page";

const mapStateToProps = (state) => ({
	privatePrograms: [state.program],
	publicPrograms: [],
});

const mapDispatchToProps = () => ({
	getPublicPrograms: () => {},
});

const ProgramsPageContainer = (props) => <ProgramsPage {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProgramsPageContainer);
