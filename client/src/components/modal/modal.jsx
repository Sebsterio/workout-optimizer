import React from "react";

import trackerData from "../../pages/tracker/tracker.data";
import getDateInfo from "../../utils/date";

import "./modal.scss";

const { log } = trackerData;

const addToLog = (dateStr, bodyPart, level) => {
	const dayLog = log.find((entry) => entry.date === dateStr);
	if (dayLog) {
		// don't overwrite exercise lvl with recovery lvl
		// if (level < 0 && dayLog[bodyPart.name] > 0) return;
		dayLog[bodyPart.name] = level;
	} else {
		log.push({
			date: dateStr,
			[bodyPart.name]: level,
		});
	}
};

// -------------------------------------------------------------

const Modal = ({ data: { bodyPart, dateStr }, closeModal }) => {
	const handleInput = (level) => {
		addToLog(dateStr, bodyPart, level);
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
