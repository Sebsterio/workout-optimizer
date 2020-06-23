import React from "react";
import "./modal.scss";

// -------------------------------------------------------------

const Modal = ({ cellData, updateLog, closeModal }) => {
	const { field, dateStr, intensity } = cellData;

	const handleInput = (newIntensity) => {
		if (intensity != newIntensity)
			updateLog({ field, dateStr, intensity: newIntensity });
		else console.log("No change");
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
					{field.levels.map(({ label, intensity }) => (
						<div className="modal__row" key={intensity}>
							<label
								className="modal__label"
								htmlFor={"add-entry-btn-" + intensity}
							>
								{label}
							</label>
							<button
								id={"add-entry-btn-" + intensity}
								className={
									"modal__level-button modal__level-button--level-" + intensity
								}
								onClick={() => handleInput(intensity)}
							>
								<div className="modal__marker"></div>
							</button>
						</div>
					))}

					<div className="modal__row modal__row--buttons">
						<button
							className={"modal__button modal__button--delete"}
							onClick={() => handleInput(null)}
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
