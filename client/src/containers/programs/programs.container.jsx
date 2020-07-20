import React from "react";
import { connect } from "react-redux";

import { clearError } from "redux/error/error.actions";

import ProgramsPage from "./programs.page";

const mapDispatchToProps = (dispatch) => ({
	clearError: () => dispatch(clearError()),
});

const ProgramsPageContainer = (props) => <ProgramsPage {...props} />;

export default connect(null, mapDispatchToProps)(ProgramsPageContainer);
