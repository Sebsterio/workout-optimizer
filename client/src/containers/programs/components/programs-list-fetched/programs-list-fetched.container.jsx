import React from "react";
import { connect } from "react-redux";

import {
	getFetchedPrograms,
	getAreProgramsDownloading,
} from "redux/programs/programs.selectors";

import { downloadPublicPrograms } from "redux/programs/programs.operations";
import { openModal } from "redux/modal/modal.actions";

import ProgramsListFetched from "./programs-list-fetched";

const mapStateToProps = (state) => ({
	programs: getFetchedPrograms(state),
	downloading: getAreProgramsDownloading(state),
});

const mapDispatchToProps = (dispatch) => ({
	getPrograms: (query) => dispatch(downloadPublicPrograms(query)),
	openModal: (data) => dispatch(openModal(data)),
});

const ProgramsListFetchedContainer = (props) => (
	<ProgramsListFetched {...props} />
);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProgramsListFetchedContainer);
