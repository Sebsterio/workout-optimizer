import React from "react";
import { connect } from "react-redux";

import { clearError } from "state/error/error.actions";
import { setEditedProgram } from "state/programs/programs.actions";

import ProgramsPage from "./programs.page";

const mapDispatchToProps = (dispatch) => ({
	setEditedProgram: (data) => dispatch(setEditedProgram(data)),
	clearError: () => dispatch(clearError()),
});

const ProgramsPageContainer = (props) => <ProgramsPage {...props} />;

export default connect(null, mapDispatchToProps)(ProgramsPageContainer);
