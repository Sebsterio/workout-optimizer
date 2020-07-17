import React from "react";
import { connect } from "react-redux";

import { getPublicPrograms } from "redux/programs/programs.operations";
import { openModal } from "redux/modal/modal.actions";

import ProgramsListFetched from "./programs-list-fetched";

const mapStateToProps = (state) => ({
	programs: state.programs.fetched,
	isDownloading: state.programs.downloading,
});

const mapDispatchToProps = (dispatch) => ({
	getPrograms: (query) => dispatch(getPublicPrograms(query)),
	openModal: (data) => dispatch(openModal(data)),
});

const ProgramsListFetchedContainer = (props) => (
	<ProgramsListFetched {...props} />
);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProgramsListFetchedContainer);
