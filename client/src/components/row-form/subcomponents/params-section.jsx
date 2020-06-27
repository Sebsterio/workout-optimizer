import React from "react";

const newDefaultParam = {
	label: "new parameter",
	type: "number",
	defaultVal: 1,
};

const ParamsSection = ({ details, setDetails }) => {
	const addParam = (e) => {
		e.preventDefault();
		setDetails([...details, newDefaultParam]);
	};

	const removeParam = (e) => {
		e.preventDefault();
		const index = e.target.dataset.index;
		const newDetails = [...details];
		newDetails.splice(index, 1);
		setDetails(newDetails);
	};

	const isParamValid = (name, val) => {
		if (name !== "label") return true;

		const isLabelUnique = details.every((deet) => deet.label !== val);
		if (isLabelUnique) return true;

		alert("Labels must be unique");
	};

	const updateParam = (e) => {
		const { name, type, checked, value, dataset } = e.target;
		const { index } = dataset;

		const newValue =
			type === "checkbox" ? checked : type === "number" ? Number(value) : value;

		if (!isParamValid(name, newValue)) return;

		const newDetails = [...details];
		newDetails[index][name] = newValue;
		setDetails(newDetails);
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
								const { label, type, defaultVal } = param;
								if (label === "done") return;
								return (
									<tr key={i}>
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
