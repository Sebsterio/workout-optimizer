import React from "react";
import shortid from "shortid";
import {
	getUniqueLabel,
	getValueFromInput,
	isInputValid,
	getUpdatedArray,
	getInjectedArray,
	getSplicedArray,
} from "../area-menu.utils";
import { Row, Table, Button, Input } from "../../_common";

export const ParamsSection = ({ details, setDetails }) => {
	// Template for adding a new param
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
			setDetails(getUpdatedArray(details, index, name, newValue));
	};

	// ---------------------- Render -----------------------

	const ParamInput = (name, type, value, i, options) => (
		<Input
			type={type}
			name={name}
			value={value}
			min={0}
			data={["index", i]}
			handler={updateParam}
			options={options ? options : null}
		/>
	);

	const getTableRow = (param, i) => {
		const { label, type, defaultVal } = param;

		// Disable editing of 'done' param
		if (label === "done") return null;

		return [
			<Button text="-" handler={removeParam} data={["index", i]} />,
			ParamInput("label", "text", label, i),
			ParamInput("type", "select", type, i, [
				["number", "Number"],
				["text", "Text"],
				["checkbox", "Checkbox"],
			]),
			ParamInput("defaultVal", type, defaultVal, i),
		];
	};

	return (
		<>
			<Row>
				{!!details.length && (
					<Table
						emptyCornerCell
						headCells={["Label", "Type", "Default"]}
						bodyRows={details.map((param, i) => getTableRow(param, i))}
					/>
				)}
			</Row>
			<Row>
				<Button text="New parameter" handler={addParam} />
			</Row>
		</>
	);
};

export default ParamsSection;
