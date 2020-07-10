import React from "react";
import { connect } from "react-redux";

import ProgramsPage from "./programs.page";

const mapStateToProps = (state) => ({
	program: state.program,
});

const mapDispatchToProps = (dispatch) => ({});

const ProgramsPageContainer = (props) => <ProgramsPage {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProgramsPageContainer);
