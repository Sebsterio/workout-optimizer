import React from "react";
import "./notes-row.scss";

const NotesRow = ({ notes, handleInput }) => (
	<div className="notes-row">
		<input
			className="notes-row__notes"
			name="notes"
			value={notes}
			onChange={handleInput}
			type="text"
			placeholder="Notes"
		/>
	</div>
);

export default NotesRow;
