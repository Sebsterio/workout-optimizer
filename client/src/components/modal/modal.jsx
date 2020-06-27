import React from "react";
import "./modal.scss";

import LogForm from "../log-form/log-form.container";
import RowForm from "../row-form/row-form.container";

const Modal = ({ cellData, closeModal, isOpen }) => {
	if (!isOpen) return null;

	const { mode } = cellData;

	return (
		<div className="modal">
			<div className="modal__bg" onClick={closeModal}></div>
			<div className="modal__card">
				<h1 className="modal__title">
					{mode === "log"
						? "Exercise Log"
						: mode === "row"
						? "Exercise Parameters"
						: ""}
				</h1>
				{mode === "log" && (
					<LogForm cellData={cellData} closeModal={closeModal} />
				)}
				{mode === "row" && (
					<RowForm cellData={cellData} closeModal={closeModal} />
				)}
			</div>
		</div>
	);
};

export default Modal;
