import React, { useEffect, useState, useRef } from "react";

import Column from "../../components/column/column.container";
import ModalContainer from "../../components/modal/modal.container";

import "./tracker.scss";

const TrackerPage = ({ areas }) => {
	const cellSize = 100; // -> store.settings

	const [cols, setCols] = useState(0); // N of cols loaded
	const [maxDateOffset, setMaxDateOffset] = useState(0); // leftmost col
	const [hasRendered, setHasRendered] = useState(false);
	const [tableScrollLeft, setTableScrollLeft] = useState(0);
	const [tableScrollTop, setTableScrollTop] = useState(0);

	const tableRef = useRef();

	// -------------------- Layout --------------------

	useEffect(() => {
		// Load enough columns to overflow table
		const updateCols = () => {
			const { offsetWidth } = tableRef.current;
			const newTotalCols = Math.ceil(offsetWidth / cellSize) + 2;
			setCols(newTotalCols);
		};

		updateCols();
		setMaxDateOffset(1);
		setHasRendered(true);

		window.addEventListener("resize", updateCols);
	}, []);

	// after first render, center scroll
	useEffect(() => {
		// tableRef.current.scrollLeft += cellSize;
		const { offsetWidth, scrollWidth } = tableRef.current;
		tableRef.current.scrollLeft = (scrollWidth - offsetWidth) / 2;
	}, [hasRendered]);

	// -------------------- Scroll --------------------

	const SCROLL_X_THRESHOLD = 50;

	// Add & remove cols && jump scroll
	const fakeScrollX = (direction) => {
		const step = direction === "left" ? 1 : -1;
		setMaxDateOffset((maxDateOffset) => maxDateOffset + step);
		tableRef.current.scrollLeft += cellSize * step;
	};

	// After scroll-triggered re-render, run fake debounced scroll
	useEffect(() => {
		const { offsetWidth, scrollWidth } = tableRef.current;
		const tableScrollRight = scrollWidth - offsetWidth - tableScrollLeft;

		if (tableScrollLeft <= SCROLL_X_THRESHOLD) fakeScrollX("left");
		else if (tableScrollRight <= SCROLL_X_THRESHOLD) fakeScrollX("right");
	}, [tableScrollLeft]);

	// On scroll, re-render
	const handleScroll = () => {
		const { scrollLeft, scrollTop } = tableRef.current;
		if (tableScrollTop !== scrollTop) setTableScrollTop(scrollTop);
		if (tableScrollLeft !== scrollLeft) setTableScrollLeft(scrollLeft);
	};

	// -------------------- Render --------------------

	return (
		<div className="page tracker" style={{ "--cell-size": cellSize + "px" }}>
			<div className="tracker__wrap">
				<div className="tracker__aside">
					<Column scrollTop={tableScrollTop} />
				</div>

				<div className="tracker__main" ref={tableRef} onScroll={handleScroll}>
					{Array(cols)
						.fill(null)
						.map((_col, i) => (
							<Column day={maxDateOffset - i} key={i} />
						))}
				</div>

				<ModalContainer />
			</div>
		</div>
	);
};

export default TrackerPage;
