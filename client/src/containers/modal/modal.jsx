import React from "react";
import "./modal.scss";

import LogMenu from "containers/log-menu";
import AreaMenu from "containers/area-menu";

const Modal = ({ cellData, closeModal, isOpen }) => {
	if (!isOpen) return null;

	const { mode } = cellData;

	return (
		<div className="modal">
			<div className="modal__bg" onClick={closeModal}></div>
			<div className="modal__card">
				{mode === "log" && (
					<LogMenu cellData={cellData} closeModal={closeModal} />
				)}
				{mode === "row" && (
					<AreaMenu cellData={cellData} closeModal={closeModal} />
				)}
			</div>
		</div>
	);
};

export default Modal;
