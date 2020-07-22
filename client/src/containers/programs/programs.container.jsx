import React from "react";
import { connect } from "react-redux";

import { setEditedProgram } from "redux/programs/programs.actions";
import { clearError } from "redux/error/error.actions";

import ProgramsPage from "./programs.page";

const mapDispatchToProps = (dispatch) => ({
	setEditedProgram: (data) => dispatch(setEditedProgram(data)),
	clearError: () => dispatch(clearError()),
});

const ProgramsPageContainer = (props) => <ProgramsPage {...props} />;

export default connect(null, mapDispatchToProps)(ProgramsPageContainer);
