import React from "react";
import { connect } from "react-redux";

import { updateProtocol } from "redux/protocol/protocol.actions";

import ProtocolsPage from "./protocols.page";

const mapStateToProps = (state) => ({
	protocol: state.protocol,
});

const mapDispatchToProps = (dispatch) => ({
	updateProtocol: (data) => dispatch(updateProtocol(data)),
});

const ProtocolsPageContainer = (props) => <ProtocolsPage {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProtocolsPageContainer);
