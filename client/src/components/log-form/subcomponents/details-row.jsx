import React from "react";
import "./details-row.scss";

// ---------------------- Component ------------------------

const DetailsRow = ({ field, details, setDetails }) => {
	// Convert protocol field labels into a default newEntry object
	const getDefaultEntry = (field, done) =>
		field.details.reduce((acc, cur) => {
			const { label, defaultVal } = cur;
			acc[label] = label === "done" ? done : defaultVal;
			return acc;
		}, {});

	const addEntry = (e, done) => {
		e.preventDefault();
		setDetails([...details, getDefaultEntry(field, done)]);
	};

	const updateEntry = ({ e, i, label, type }) => {
		const newValue =
			type === "checkbox"
				? e.target.checked
				: type === "number"
				? Number(e.target.value)
				: e.target.value;

		const newDetails = [...details];
		newDetails[i][label] = newValue;
		setDetails(newDetails);
	};

	const removeEntry = (e) => {
		e.preventDefault();
		const newDetails = [...details];
		const index = e.target.dataset.index;
		newDetails.splice(index, 1);
		setDetails(newDetails);
	};

	return (
		<div className="details-row">
			{!!details.length && (
				<table>
					{/* Details Labels */}
					<thead>
						<tr>
							<th>{/* empty */}</th>
							{
								// Make header labels from protocol field
								field.details.map((detail) => (
									<th className="details-row__label" key={detail.label}>
										{detail.label}
									</th>
								))
							}
						</tr>
					</thead>

					{/* Details Entries */}
					<tbody>
						{
							// Convert 'details' entries from log into table rows
							details.map((entry, i) => (
								<tr key={i}>
									<td>
										<button onClick={removeEntry} data-index={i} children="-" />
									</td>
									{field.details.map(({ label, type }) => (
										<td key={label}>
											{
												// Convert entry values to input elements
												type === "checkbox" ? (
													<input
														className="details-row__item"
														type="checkbox"
														name={label}
														checked={entry[label]}
														value={entry[label]}
														onChange={(e) => updateEntry({ e, i, label, type })}
													></input>
												) : (
													<input
														className="details-row__item"
														type={type}
														name={label}
														value={entry[label]}
														onChange={(e) => updateEntry({ e, i, label, type })}
													></input>
												)
											}
										</td>
									))}
								</tr>
							))
						}
					</tbody>
				</table>
			)}

			{/* Permanent buttons */}
			<div className="details-row__buttons">
				<button
					className="details-row__button"
					onClick={(e) => addEntry(e, false)}
				>
					New plan
				</button>
				<button
					className="details-row__button"
					onClick={(e) => addEntry(e, true)}
				>
					New log
				</button>
			</div>
		</div>
	);
};

export default DetailsRow;
