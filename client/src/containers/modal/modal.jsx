import React from "react";
import "./modal.scss";

import LogMenu from "containers/log-menu";
import ProgramFieldMenu from "containers/program-field-menu";
import { ProgramDetails } from "containers/program-details";

const Modal = ({ mode, data, isOpen, closeModal }) => {
	if (!isOpen) return null;

	return (
		<div className="modal">
			<div className="modal__bg" onClick={closeModal}></div>
			<div className="modal__card">
				{mode === "log" && <LogMenu cellData={data} closeModal={closeModal} />}
				{mode === "row" && (
					<ProgramFieldMenu cellData={data} closeModal={closeModal} />
				)}
				{mode === "program" && (
					<ProgramDetails program={data} closeModal={closeModal} />
				)}
			</div>
		</div>
	);
};

export default Modal;
