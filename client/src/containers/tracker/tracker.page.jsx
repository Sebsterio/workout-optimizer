import React, { useEffect, useState, useRef } from "react";
import { Page } from "components";
import { TrackerTable, Side, Day } from "./components";

const TrackerPage = ({ cellSize }) => {
	const [cols, setCols] = useState(0); // N of cols loaded
	const [firstDayRendered, setFirstDayRendered] = useState(0); // leftmost col

	const tableRef = useRef();

	// Put "today" col in the middle
	const centerTable = (cols) => {
		const pastCols = (cols - 1) / 2;
		setFirstDayRendered(-pastCols);
	};

	useEffect(() => {
		// TODO: set in Options
		document.documentElement.style.setProperty("--cell-size", cellSize + "px");

		// Render enough columns to overflow table
		// NOTE: don't extract (useEffect warning)
		const fillTable = () => {
			const { offsetWidth } = tableRef.current;
			let cols = Math.ceil(offsetWidth / cellSize) + 2;
			if (cols % 2 === 0) cols++;

			setCols(cols);
			return cols;
		};

		const cols = fillTable();
		centerTable(cols);

		window.addEventListener("resize", fillTable);
		return () => window.removeEventListener("resize", fillTable);
	}, [cellSize]);

	return (
		<TrackerTable
			tableRef={tableRef}
			setFirstDayRendered={setFirstDayRendered}
			cellSize={cellSize}
			sideColumn={<Side />}
		>
			{Array.from({ length: cols }, (_, i) => firstDayRendered + i).map(
				(dateOffset) => (
					<Day day={dateOffset} key={dateOffset} />
				)
			)}
		</TrackerTable>
	);
};

export default TrackerPage;
