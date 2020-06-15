import React from "react";
import { connect } from "react-redux";

import { updateLog } from "../../redux/log/log.actions";
import { closeModal } from "../../redux/modal/modal.actions";

import Modal from "./modal";

const mapStateToProps = (state) => ({
	isOpen: state.modal.isOpen,
	cellData: state.modal.cellData,
});

const mapDispatchToProps = (dispatch) => ({
	updateLog: (data) => dispatch(updateLog(data)),
	closeModal: () => dispatch(closeModal()),
});

const ModalContainer = (props) => (props.isOpen ? <Modal {...props} /> : null);

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
