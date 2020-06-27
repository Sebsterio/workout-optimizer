import React from "react";
import "./notes-row.scss";

const NotesRow = ({ notes, setNotes }) => (
	<div className="notes-row">
		<input
			className="notes-row__notes"
			name="notes"
			value={notes}
			onChange={(e) => setNotes(e.target.value)}
			type="text"
			placeholder="Notes"
		/>
	</div>
);

export default NotesRow;
