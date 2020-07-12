import React, { useEffect, useState, useRef } from "react";
import { Page } from "components";
import { TrackerTable, Side, Day } from "./components";

const TrackerPage = ({ cellSize }) => {
	const [cols, setCols] = useState(0); // N of cols loaded
	const [maxDateOffset, setMaxDateOffset] = useState(0); // leftmost col

	const tableRef = useRef();

	useEffect(() => {
		// TODO: set in Options
		document.documentElement.style.setProperty("--cell-size", cellSize + "px");

		// Load enough columns to overflow table
		// Minimum 2 extra cols to prevent fakeScroll infinite recursion
		const updateCols = () => {
			const { offsetWidth } = tableRef.current;
			let newTotalCols = Math.ceil(offsetWidth / cellSize) + 2;
			if (newTotalCols % 2 === 0) newTotalCols++;
			setCols(newTotalCols);
			return newTotalCols;
		};

		// Put "today" col in the middle
		const newTotalCols = updateCols();
		const futureCols = (newTotalCols - 1) / 2;
		setMaxDateOffset(futureCols);

		window.addEventListener("resize", updateCols);
		return () => window.removeEventListener("resize", updateCols);
	}, [cellSize]);

	return (
		<Page>
			<TrackerTable
				tableRef={tableRef}
				setMaxDateOffset={setMaxDateOffset}
				cellSize={cellSize}
			>
				<Side />
				{Array.from({ length: cols }, (_, i) => maxDateOffset - i).map(
					(dateOffset) => (
						<Day day={dateOffset} key={dateOffset} />
					)
				)}
			</TrackerTable>
		</Page>
	);
};

export default TrackerPage;
