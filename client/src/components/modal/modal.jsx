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
	updateMaxCustomRest,
}) => {
	const [notes, setNotes] = useState(stats ? stats.notes : "");
	const [details, setDetails] = useState(stats ? stats.details : []);
	const [intensity, setIntensity] = useState(stats ? stats.intensity : 0);
	const [rest, setRest] = useState(stats ? stats.rest : 0);

	const entryExists = !!stats;

	// Update intensity or rest in local state
	const updateCustomLevels = (e) => {
		if (e.target.name === "intensity") setIntensity(Number(e.target.value));
		else if (e.target.name === "rest") setRest(Number(e.target.value));
	};

	// Save custom rest in redux to inform Fields about custom max rest
	const checkCustomRest = (standardRest) => {
		// Ignore if rest is non-custom or hasn't changed
		if (standardRest >= 0) return;
		if (!!stats && rest === stats.rest) return;

		updateMaxCustomRest({ field, rest });
	};

	// Update log entry in redux & db
	const handleSubmit = (e, newIntensity, newRest) => {
		e.preventDefault();
		updateLog({
			dateStr,
			field,
			stats: {
				intensity: newIntensity !== undefined ? newIntensity : intensity,
				rest: newRest !== undefined ? newRest : rest,
				details,
				notes,
			},
		});
		checkCustomRest(newRest);
		closeModal();
	};

	// Delete log entry in redux & db
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
					<NotesRow notes={notes} setNotes={setNotes} />
					<DetailsRow field={field} details={details} setDetails={setDetails} />
					<LevelsRow
						field={field}
						intensity={intensity}
						rest={rest}
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
