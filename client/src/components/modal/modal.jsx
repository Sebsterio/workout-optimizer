import React from "react";
import "./modal.scss";

// -------------------------------------------------------------

const Modal = ({ cellData, addEntry, removeEntry, closeModal }) => {
	const { area, dateStr } = cellData;

	const handleInput = (level) => {
		if (level === 0) removeEntry({ dateStr, area });
		else addEntry({ dateStr, area, level });
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
					{area.levels.map(({ label }, i) => (
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
