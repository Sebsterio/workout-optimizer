import React from "react";
import { connect } from "react-redux";

import { getSavedPrograms } from "state/programs/programs.selectors";

import ProgramsListSaved from "./programs-list-saved";

const mapStateToProps = (state) => ({
	programs: getSavedPrograms(state),
});

const ProgramsListSavedContainer = (props) => <ProgramsListSaved {...props} />;

export default connect(mapStateToProps, null)(ProgramsListSavedContainer);
