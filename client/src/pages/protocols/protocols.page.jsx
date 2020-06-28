import React from "react";

import "./protocols.scss";

import ProtocolField from "./subcomponents/protocol-field.container";

const ProtocolsPage = ({ protocol }) => {
	const { name, description, fields } = protocol;

	const handleChange = () => {};

	return (
		<div className="page protocols">
			<div className="protocols__wrapper">
				<h1>ProtocolsPage</h1>

				<div className="protocols__row">
					<button disabled>Publish</button>
					<button disabled>Download</button>
				</div>

				<div className="protocols__row">
					<label htmlFor="protocols-n">Protocol Name:</label>
					<input
						type="text"
						name="name"
						id="protocols-n"
						value={name || ""}
						onChange={handleChange}
					/>
				</div>

				<div className="protocols__row">
					<label htmlFor="protocols-d" className="protocols__label">
						Description:
					</label>
					<textarea
						name="description"
						id="protocols-d"
						value={description || ""}
						onChange={handleChange}
					></textarea>
				</div>

				{fields.map((field) => (
					<ProtocolField field={field} key={field.name} />
				))}
			</div>
		</div>
	);
};

export default ProtocolsPage;
