import React from "react";
import { connect } from "react-redux";

import { closeModal } from "redux/modal/modal.actions";

import Modal from "./modal";

const mapStateToProps = (state) => ({
	isOpen: state.modal.isOpen,
	cellData: state.modal.cellData,
});

const mapDispatchToProps = (dispatch) => ({
	closeModal: () => dispatch(closeModal()),
});

const ModalContainer = (props) => <Modal {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
