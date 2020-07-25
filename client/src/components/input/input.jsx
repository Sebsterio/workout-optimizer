import React from "react";
import shortid from "shortid";
import {
	getAttributesFromProps,
	getClassNamesFromProps,
} from "utils/component";
import "./input.scss";

export const Input = (props) => {
	const { type, label, handler, options, data } = props;

	// Container classNames
	const classes = getClassNamesFromProps("input", props, [
		["type", "value-only"],
		"column",
		"narrow",
	]);

	// Input element attributes
	const attributes = {
		className: "input__input",
		onChange: (e) => handler(e.target.value, e.target),
		...getAttributesFromProps(props, [
			"name",
			"value",
			"min",
			"max",
			"placeholder",
			"disabled",
			["checked", type === "checkbox"],
			["type", type !== "textarea"],
			["cols", type === "textarea", String],
			["rows", type === "textarea", String],
		]),
	};
	if (label) attributes.id = shortid.generate();
	if (data) attributes[`data-${data[0]}`] = data[1];

	// Render
	return (
		<div className={classes}>
			{label && (
				<label className="input__label" htmlFor={attributes.id}>
					{label}
				</label>
			)}
			{type === "textarea" ? (
				<textarea {...attributes}></textarea>
			) : type === "select" ? (
				<select {...attributes}>
					{options &&
						options.map((opt) => (
							<option value={opt[0]} key={opt[0]}>
								{opt[1]}
							</option>
						))}
				</select>
			) : (
				<input {...attributes} />
			)}
		</div>
	);
};

export const TextInput = (props) => <Input type="text" {...props} />;

export const TextArea = (props) => <Input type="textarea" {...props} />;
