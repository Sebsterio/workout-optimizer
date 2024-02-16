import React from "react";
import { connect } from "react-redux";

import { closeModal } from "state/modal/modal.actions";
import { getData, getIsOpen, getMode } from "state/modal/modal.selectors";

import Modal from "./modal";

const mapStateToProps = (state) => ({
	data: getData(state),
	mode: getMode(state),
	isOpen: getIsOpen(state),
});

const mapDispatchToProps = (dispatch) => ({
	closeModal: () => dispatch(closeModal()),
});

const ModalContainer = (props) => <Modal {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
