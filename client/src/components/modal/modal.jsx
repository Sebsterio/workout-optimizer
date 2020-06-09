import React from "react";

import trackerData from "../../pages/tracker/tracker.data";
import getDate from "../../utils/date";

import "./modal.scss";

const addToLog = (log, dateStr, bodyPart, level) => {
	const dayLog = log.find((entry) => entry.date === dateStr);
	if (dayLog) {
		// don't overwrite exercise lvl with recovery lvl
		if (level < 0 && dayLog[bodyPart.name] > 0) return;
		dayLog[bodyPart.name] = level;
	} else {
		log.push({
			date: dateStr,
			[bodyPart.name]: level,
		});
	}
};

const getRecoveryTime = ({ protocol, bodyPart, level }) => {
	const bodyPartInfo = protocol.bodyParts.find(
		(item) => item.name === bodyPart.name
	);
	return bodyPartInfo["rest" + level];
};

// -------------------------------------------------------------

const Modal = ({ data: { bodyPart, dateStr }, closeModal }) => {
	const { log, protocol } = trackerData;

	// TODO: add exercise only until today; else add planned
	const handleInput = (level) => {
		// add exerecise to log
		addToLog(log, dateStr, bodyPart, level);

		// add recovery days to log
		// TODO: reducing exercise size must reset trailing recovery days
		// --> calculate recovery on render; no DB
		// TODO: force recovery day after N days of small exercise in a row
		const recoveryTime = getRecoveryTime({ protocol, bodyPart, level });
		for (let i = 1; i <= recoveryTime; i++) {
			const date = new Date(dateStr);
			const recoveryDateStr = getDate(date, i).dateStr;
			const recoveryLevel = -1 * (recoveryTime + 1 - i);
			addToLog(log, recoveryDateStr, bodyPart, recoveryLevel);
			// console.log(log);
		}

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
					{[
						{ level: 3, label: " Big" },
						{ level: 2, label: "Medium" },
						{ level: 1, label: "Small" },
						{ level: 0, label: "None" },
					].map(({ level, label }) => (
						<div className="modal__row" key={level}>
							<label
								className="modal__label"
								htmlFor={"add-entry-btn-" + level}
							>
								{label}
							</label>
							<button
								id={"add-entry-btn-" + level}
								className={"modal__button modal__button--level-" + level}
								onClick={() => handleInput(level)}
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
