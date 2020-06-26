import React, { useState } from "react";
import "./modal.scss";

import ButtonsRow from "./components/buttons-row/buttons-row";
import LevelsRow from "./components/levels-row/levels-row";
import DetailsRow from "./components/details-row/details-row";
import NotesRow from "./components/notes-row/notes-row";

// -------------------------------------------------------------

const Modal = ({
	cellData: { field, dateStr, stats },
	updateLog,
	closeModal,
}) => {
	const [notes, setNotes] = useState(stats ? stats.notes : "");
	const [details, setDetails] = useState(stats ? stats.details : []);
	const [intensity, setIntensity] = useState(stats ? stats.intensity : 1);
	const [rest, setRest] = useState(stats ? stats.rest : 0);

	const entryExists = !!stats;

	const handleNotes = (e) => setNotes(e.target.value);

	const updateCustomLevels = (e) => {
		if (e.target.name === "intensity") setIntensity(Number(e.target.value));
		else if (e.target.name === "rest") setRest(Number(e.target.value));
	};

	// Update log entry
	const handleSubmit = (e, newIntensity, newRest) => {
		e.preventDefault();

		const newLog = {
			dateStr,
			field,
			stats: {
				intensity: newIntensity !== undefined ? newIntensity : intensity,
				rest: newRest !== undefined ? newRest : rest,
				details,
				notes,
			},
		};
		updateLog(newLog);
		closeModal();
	};

	const handleDelete = (e) => {
		e.preventDefault();
		updateLog({ field, dateStr, stats: "DELETE" });
		closeModal();
	};

	return (
		<div className="modal">
			<div className="modal__bg" onClick={closeModal}></div>
			<div className="modal__card">
				<h1 className="modal__title">Add Exercise</h1>
				<div className="modal__sub-title">
					<span>{field.name}</span>
					<span>|</span>
					<span>{dateStr}</span>
				</div>
				<form className="modal__form" action="">
					<NotesRow notes={notes} handleInput={handleNotes} />
					<DetailsRow field={field} details={details} setDetails={setDetails} />
					<LevelsRow
						field={field}
						intensity={intensity}
						updateCustomLevels={updateCustomLevels}
						handleSubmit={handleSubmit}
					/>
					<ButtonsRow
						entryExists={entryExists}
						handleSubmit={handleSubmit}
						handleDelete={handleDelete}
						closeModal={closeModal}
					/>
				</form>
			</div>
		</div>
	);
};

export default Modal;
