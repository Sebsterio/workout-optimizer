import React, { useEffect, useState, useRef } from "react";

import Column from "../../components/column/column.container";
import ModalContainer from "../../components/modal/modal.container";

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

		// put "today" col in the middle
		const newTotalCols = updateCols();
		const futureCols = (newTotalCols - 1) / 2;
		setMaxDateOffset(futureCols);
		setHasRendered(true);

		window.addEventListener("resize", updateCols);
		return () => window.removeEventListener("resize", updateCols);
	}, [cellSize]);

	// after first render, center scroll
	useEffect(() => {
		// tableRef.current.scrollLeft += cellSize;
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

	const scrollTop = tableRef.current ? tableRef.current.scrollTop : 0;

	return (
		<div className="page tracker" style={{ "--cell-size": cellSize + "px" }}>
			<div className="tracker__wrap">
				<div className="tracker__aside">
					<Column scrollTop={scrollTop} />
				</div>
				<div className="tracker__main" ref={tableRef} onScroll={handleScroll}>
					{Array.from({ length: cols }, (_, i) => maxDateOffset - i).map(
						(dateOffset) => (
							<Column day={dateOffset} key={dateOffset} />
						)
					)}
				</div>
				<ModalContainer />
			</div>
		</div>
	);
};

export default TrackerPage;
