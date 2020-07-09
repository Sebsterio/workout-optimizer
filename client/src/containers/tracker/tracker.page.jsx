import React, { useEffect, useState, useRef } from "react";
import { Column } from "./components";
import "./tracker.scss";

const TrackerPage = ({ cellSize }) => {
	const [cols, setCols] = useState(0); // N of cols loaded
	const [maxDateOffset, setMaxDateOffset] = useState(0); // leftmost col
	const [hasRendered, setHasRendered] = useState(false);

	const tableRef = useRef();

	// -------------------- Layout --------------------

	useEffect(() => {
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
		setHasRendered(true);

		window.addEventListener("resize", updateCols);
		return () => window.removeEventListener("resize", updateCols);
	}, [cellSize]);

	// After first render, center scroll
	useEffect(() => {
		const { offsetWidth, scrollWidth } = tableRef.current;
		tableRef.current.scrollLeft = (scrollWidth - offsetWidth) / 2;
	}, [hasRendered]);

	// -------------------- Scroll --------------------

	const SCROLL_X_THRESHOLD = cellSize;

	// Add & remove cols && jump scroll
	const fakeScrollX = (direction) => {
		const step = direction === "left" ? 1 : -1;
		tableRef.current.scrollLeft += cellSize * step;
		setMaxDateOffset((maxDateOffset) => maxDateOffset + step);
	};

	const handleScroll = () => {
		const { scrollLeft, offsetWidth, scrollWidth } = tableRef.current;
		const scrollRight = scrollWidth - offsetWidth - scrollLeft;

		if (scrollLeft <= SCROLL_X_THRESHOLD) fakeScrollX("left");
		else if (scrollRight <= SCROLL_X_THRESHOLD) fakeScrollX("right");
	};

	// -------------------- Render --------------------

	const cssVars = { "--cell-size": cellSize + "px" };

	return (
		<div className="page tracker" style={cssVars}>
			<div className="tracker__table" ref={tableRef} onScroll={handleScroll}>
				<Column isAside />
				{Array.from({ length: cols }, (_, i) => maxDateOffset - i).map(
					(dateOffset) => (
						<Column day={dateOffset} key={dateOffset} />
					)
				)}
			</div>
		</div>
	);
};

export default TrackerPage;
