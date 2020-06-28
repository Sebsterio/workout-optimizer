import React from "react";
import shortid from "shortid";
import {
	getUniqueLabel,
	getValueFromInput,
	isInputValid,
	getUpdateArray,
	getInjectedArray,
	getSplicedArray,
} from "../row-form.utils";

const ParamsSection = ({ details, setDetails }) => {
	// Template param
	const getNewDefaultParam = () => ({
		label: getUniqueLabel(details),
		type: "number",
		defaultVal: 1,
		id: shortid.generate(),
	});

	// Add new param in second-to-last position
	const addParam = (e) => {
		e.preventDefault();
		const newParam = getNewDefaultParam();
		setDetails(getInjectedArray(details, newParam));
	};

	// Remove details item with corresponding index
	const removeParam = (e) => {
		e.preventDefault();
		const index = e.target.dataset.index;
		setDetails(getSplicedArray(details, index));
	};

	// Modify param prop value if valid
	const updateParam = (e) => {
		const { name, type, checked, value, dataset } = e.target;
		const { index } = dataset;
		const newValue = getValueFromInput(type, checked, value);
		if (isInputValid(name, newValue, details))
			setDetails(getUpdateArray(details, index, name, newValue));
	};

	return (
		<section className="row-form__section">
			{!!details.length && (
				<table>
					{/* Labels */}
					<thead>
						<tr>
							<th>{/* empty */}</th>
							<th className="details-section__label">Label</th>
							<th className="details-section__label">Type</th>
							<th className="details-section__label">Default</th>
						</tr>
					</thead>

					{/* ParametersList */}
					<tbody>
						{
							// Convert 'details' objects into table rows
							details.map((param, i) => {
								const { label, type, defaultVal, id } = param;

								// disable editing of 'done' param
								if (label === "done") return null;

								return (
									<tr key={id}>
										{/* Remove btn */}
										<td>
											<button
												onClick={removeParam}
												data-index={i}
												children="-"
											/>
										</td>
										{/* Label */}
										<td>
											<input
												className="details-section__input"
												type="text"
												name="label"
												value={label}
												data-index={i}
												onChange={updateParam}
											></input>
										</td>
										{/* Type */}
										<td>
											<select
												className="details-section__input"
												name="type"
												value={type}
												data-index={i}
												onChange={updateParam}
											>
												<option value="number">Number</option>
												<option value="text">Text</option>
												<option value="checkbox">Checkbox</option>
											</select>
										</td>
										{/* Default Val */}
										<td>
											<input
												className="details-section__input"
												type={type}
												name="defaultVal"
												value={defaultVal}
												checked={defaultVal}
												min={0}
												data-index={i}
												onChange={updateParam}
											></input>
										</td>
									</tr>
								);
							})
						}
					</tbody>
				</table>
			)}

			{/* Button */}
			<div className="details-section__row">
				<button className="details-section__button" onClick={addParam}>
					New parameter
				</button>
			</div>
		</section>
	);
};

export default ParamsSection;
