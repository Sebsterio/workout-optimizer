import React from "react";
import "./modal.scss";

import FieldForm from "../field-form/field-form.container";

const Modal = ({ cellData, closeModal, isOpen }) => {
	if (!isOpen) return null;

	return (
		<div className="modal">
			<div className="modal__bg" onClick={closeModal}></div>
			<div className="modal__card">
				<h1 className="modal__title">Add Exercise</h1>
				<FieldForm cellData={cellData} closeModal={closeModal} />
			</div>
		</div>
	);
};

export default Modal;
