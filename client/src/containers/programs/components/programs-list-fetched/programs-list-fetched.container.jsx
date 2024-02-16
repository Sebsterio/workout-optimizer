import React from "react";
import { connect } from "react-redux";

import { openModal } from "state/modal/modal.actions";
import { downloadPublicPrograms } from "state/programs/programs.operations";
import { getAreProgramsDownloading, getFetchedPrograms } from "state/programs/programs.selectors";

import ProgramsListFetched from "./programs-list-fetched";

const mapStateToProps = (state) => ({
	programs: getFetchedPrograms(state),
	downloading: getAreProgramsDownloading(state),
});

const mapDispatchToProps = (dispatch) => ({
	getPrograms: (query) => dispatch(downloadPublicPrograms(query)),
	openModal: (data) => dispatch(openModal(data)),
});

const ProgramsListFetchedContainer = (props) => <ProgramsListFetched {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(ProgramsListFetchedContainer);
