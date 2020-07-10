import React from "react";
import { connect } from "react-redux";

import {
	updateProtocol,
	publishProtocol,
} from "redux/protocol/protocol.actions";
import { openModal } from "redux/modal/modal.actions";

import ProtocolMenu from "./protocol-menu";

const mapStateToProps = (state) => ({
	protocol: state.protocol,
});

const mapDispatchToProps = (dispatch) => ({
	updateProtocol: (data) => dispatch(updateProtocol(data)),
	publishProtocol: () => dispatch(publishProtocol()),
	openModal: (data) => dispatch(openModal(data)),
});

const ProtocolMenuContainer = (props) => <ProtocolMenu {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProtocolMenuContainer);
