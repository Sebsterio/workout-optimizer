import React from "react";

const TextInputSection = ({ name, value, handler }) => {
	const id = "rfti-" + name;
	return (
		<section className="row-form__section">
			<div className="row-form__row">
				<label className="row-form__row-label" htmlFor={id}>
					{name}
				</label>
				<input
					type="text"
					className="row-form__text-input--wide"
					name={name}
					value={value}
					onChange={(e) => handler(e.target.value)}
					id={id}
				/>
			</div>
		</section>
	);
};

export default TextInputSection;
