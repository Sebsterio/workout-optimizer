import React, { useEffect, useState, useRef } from "react";

import ColumnContainer from "../../components/column/column.container";
import ModalContainer from "../../components/modal/modal.container";
import LogSpinner from "../../components/log-spinner/log-spinner.container";

import "./tracker.scss";

const TrackerPage = ({ areas }) => {
	const cellSize = 100; // -> store.settings
	const hideScrollBar = false; // -> store.settings

	const [cols, setCols] = useState(0); // N of cols loaded
	const [maxDateOffset, setMaxDateOffset] = useState(0); // leftmost col
	const [hasRendered, setHasRendered] = useState(false);
	const [tableScrollLeft, setTableScrollLeft] = useState(0);
	const [tableScrollTop, setTableScrollTop] = useState(0);

	const tableRef = useRef(null);

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

	const reverseTranslateY = { transform: `translateY(${-tableScrollTop}px)` };
	const translateY = { transform: `translateY(${tableScrollTop}px)` };

	const Aside = (
		<div className="tracker__aside">
			<div className="tracker__aside-body" style={reverseTranslateY}>
				{areas.map((bodyPart, i) => (
					<div className="tracker__aside-cell" key={bodyPart.name}>
						{bodyPart.name}
					</div>
				))}
			</div>

			<div className="tracker__aside-head">
				<LogSpinner />
			</div>
		</div>
	);

	const mainTableClass =
		"tracker__main" + (hideScrollBar ? " no-scrollbar" : "");

	const MainTable = (
		<div className={mainTableClass} ref={tableRef} onScroll={handleScroll}>
			{Array(cols)
				.fill(null)
				.map((_col, i) => (
					<ColumnContainer
						isVisible={true}
						headOffsetY={translateY}
						dateOffset={maxDateOffset - i}
						key={i}
					/>
				))}
		</div>
	);

	return (
		<div className="page tracker" style={{ "--cell-size": cellSize + "px" }}>
			<div className="tracker__wrap">
				{Aside}
				{MainTable}
				<ModalContainer />
			</div>
		</div>
	);
};

export default TrackerPage;
