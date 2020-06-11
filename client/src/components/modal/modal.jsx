import React from "react";

import { addToLog } from "../../utils/log";

import "./modal.scss";

// -------------------------------------------------------------

const Modal = ({ data: { bodyPart, dateStr }, closeModal }) => {
	const handleInput = (level) => {
		addToLog({ dateStr, bodyPart, level });
		closeModal();
	};

	const handleModalBgClick = (e) => {
		if (e.target.classList.contains("modal")) closeModal();
	};

	return (
		<div className="modal" onClick={handleModalBgClick}>
			<div className="modal__card">
				<h1 className="modal__title">Add Exercise</h1>
				<form action="">
					{bodyPart.levels.map(({ label }, i) => (
						<div className="modal__row" key={i}>
							<label className="modal__label" htmlFor={"add-entry-btn-" + i}>
								{label}
							</label>
							<button
								id={"add-entry-btn-" + i}
								className={"modal__button modal__button--level-" + i}
								onClick={() => handleInput(i)}
							>
								<div className="modal__marker"></div>
							</button>
						</div>
					))}
				</form>
			</div>
		</div>
	);
};

export default Modal;
