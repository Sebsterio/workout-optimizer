import React, { useState } from "react";
import "./modal.scss";

// -------------------------------------------------------------

const Modal = ({ cellData, updateLog, closeModal }) => {
	const { field, dateStr, stats } = cellData;

	const [newStats, setNewStats] = useState({
		intensity: stats ? stats.intensity : null,
		notes: stats ? stats.notes : "",
		rest: stats ? stats.rest : null,
		details: stats ? stats.details : null,
	});

	const { intensity, notes, rest, details } = newStats;

	const handleInput = (e) => {
		setNewStats({
			...newStats,
			[e.target.name]: e.target.value,
		});
	};

	// Update log entry if has changed
	const handleSubmit = (newIntensity) => {
		if (newIntensity !== intensity || newStats !== stats)
			updateLog({
				field,
				dateStr,
				stats: {
					...newStats,
					intensity: newIntensity,
				},
			});
		else console.log("No change");
		closeModal();
	};

	return (
		<div className="modal">
			<div className="modal__bg" onClick={closeModal}></div>
			<div className="modal__card">
				<h1 className="modal__title">Add Exercise</h1>
				<form action="">
					{/* ------------------ Notes ------------------- */}

					<div className="modal__row modal__row--notes">
						<label className="modal__label" htmlFor="modal-notes">
							Notes
						</label>
						<input
							className="modal__notes"
							name="notes"
							value={notes}
							onChange={handleInput}
							id="modal-notes"
							type="text"
						/>
					</div>

					{/* ------------------ Level buttons ------------------- */}

					{field.levels.map(({ label, intensity, rest }) => {
						const restMsg =
							rest > 1 ? rest + " days" : rest === 1 ? rest + " day" : "none";
						return (
							<div className="modal__row modal__row--levels" key={intensity}>
								<label
									className="modal__label"
									htmlFor={"add-entry-btn-" + intensity}
								>
									{label}
									<div className="modal__note">Rest: {restMsg}</div>
								</label>
								<button
									id={"add-entry-btn-" + intensity}
									className={
										"modal__level-button modal__level-button--level-" +
										intensity
									}
									onClick={() => handleSubmit(intensity)}
								>
									<div className="modal__marker"></div>
								</button>
							</div>
						);
					})}

					{/* ---------------------- Modal buttons ------------------- */}

					<div className="modal__row modal__row--buttons">
						<button
							className={"modal__button modal__button--delete"}
							onClick={() => handleSubmit(null)}
						>
							Delete
						</button>
						<button className={"modal__button modal__button--done"}>
							Completed
						</button>
						<button className={"modal__button modal__button--reschedule"}>
							Reschedule
						</button>
					</div>

					<div className="modal__row modal__row--buttons">
						<button
							className={"modal__button modal__button--close"}
							onClick={closeModal}
						>
							Close
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Modal;
