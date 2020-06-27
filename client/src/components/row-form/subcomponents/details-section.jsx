import React from "react";

const newDefaultDetail = {
	label: "new parameter",
	type: "number",
	defaultVal: 1,
};

const DetailsSection = ({ details, setDetails }) => {
	const addParam = (e) => {
		e.preventDefault();
		setDetails([...details, newDefaultDetail]);
	};

	const removeParam = (e) => {
		e.preventDefault();
		const index = e.target.dataset.index;
		const newDetails = [...details];
		newDetails.splice(index, 1);
		setDetails(newDetails);
	};

	const updateParam = (e) => {
		const index = e.target.dataset.index;
		const newValue =
			e.target.type === "checkbox"
				? e.target.checked
				: e.target.type === "number"
				? Number(e.target.value)
				: e.target.value;
		const newDetails = [...details];
		newDetails[index][e.target.name] = newValue;
		setDetails(newDetails);
	};

	// ---------------------- Render -----------------------

	// Convert 'details' objects into table rows
	const ParametersList = details.map((param, i) => {
		const { label, type, defaultVal } = param;
		if (label === "done") return;
		return (
			<tr key={label}>
				{/* Remove btn */}
				<td>
					<button onClick={removeParam} data-index={i} children="-" />
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
	});

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
					<tbody>{ParametersList}</tbody>
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

export default DetailsSection;
