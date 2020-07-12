import React, { useState, useEffect } from "react";
import "./tracker-table.scss";

const TrackerTable = ({ children, tableRef, setMaxDateOffset, cellSize }) => {
	const SCROLL_X_THRESHOLD = cellSize;

	const [hasRendered, setHasRendered] = useState(false);

	// After first render, center scroll
	useEffect(() => {
		const { offsetWidth, scrollWidth } = tableRef.current;
		tableRef.current.scrollLeft = (scrollWidth - offsetWidth) / 2;
		setHasRendered(true);
	}, [hasRendered, tableRef]);

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

	return (
		<div className="tracker-table" ref={tableRef} onScroll={handleScroll}>
			{children}
		</div>
	);
};

export default TrackerTable;
