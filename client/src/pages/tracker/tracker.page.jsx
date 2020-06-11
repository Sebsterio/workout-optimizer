import React, { useEffect, useState } from "react";

import ColumnContainer from "../../components/column/column.container";
import ModalContainer from "../../components/modal/modal.container";

import "./tracker.scss";

// TODO: add cols on resize
// aside transform on scroll Y, not X
// TODO: single translateX for all table heads; aside head just fixed

const TrackerPage = ({ areas }) => {
	const cellWidth = 100;

	const [colsNum, setColsNum] = useState(1); // n of cols loaded
	const [tableContentWidth, setTableContentWidth] = useState(0);
	const [scrollX, setScrollX] = useState(0); // table scroll left
	const [scrollY, setScrollY] = useState(0); // table scroll top
	const [firstRenderedCol, setFirstRenderedCol] = useState(0); // arr index
	const [lastRenderedCol, setLastRenderedCol] = useState(99); // arr index

	// onMount, add columns to slightly overflow table
	useEffect(() => {
		const colsNum = Math.ceil(window.innerWidth / cellWidth);
		setColsNum(colsNum);
		setTableContentWidth(colsNum * cellWidth);
	}, []);

	// -------------------- Scroll --------------------

	const handleScrollX = (e, scrollLeft) => {
		// only populate cols/cells in view
		const tableWidth = e.target.offsetWidth;
		const firstVisibleCol = Math.floor(scrollLeft / cellWidth);
		const visibleColsNum = Math.floor((tableWidth - cellWidth) / cellWidth);
		const lastVisibleCol = firstVisibleCol + visibleColsNum;
		setFirstRenderedCol(firstVisibleCol > 0 ? firstVisibleCol - 1 : 0);
		setLastRenderedCol(lastVisibleCol + 1);

		// append new column if scrolled near right edge
		if (scrollLeft + tableWidth >= tableContentWidth) {
			setColsNum(colsNum + 1);
			setTableContentWidth(colsNum * cellWidth);
		}
	};

	// Main table scroll X or Y
	const handleScroll = (e) => {
		const scrollLeft = e.target.scrollLeft;
		if (scrollLeft !== scrollX) handleScrollX(e, scrollLeft);

		// set both in either case due to setState lag
		setScrollY(e.target.scrollTop);
		setScrollX(scrollLeft);
	};

	// -------------------- Render --------------------

	const translateX = { transform: `translateX(${scrollX}px)` };
	const translateY = { transform: `translateY(${scrollY}px)` };

	const Aside = (
		<div className="table__aside" style={translateX}>
			<div className="table__aside-head" style={translateY}>
				^ {/* expand/collapse header button */}
			</div>
			{areas.map((bodyPart, i) => (
				<div className="table__aside-cell" key={bodyPart.name}>
					{bodyPart.name}
				</div>
			))}
		</div>
	);

	const isColVisible = (i) => i >= firstRenderedCol && i <= lastRenderedCol;

	const MainTable = (
		<div className="table__main">
			{Array(colsNum)
				.fill(null)
				.map((_col, i) => (
					<ColumnContainer
						isVisible={isColVisible(i)}
						headOffsetY={translateY}
						dateOffset={2 - i}
						key={i}
					/>
				))}
		</div>
	);

	return (
		<div className="page tracker">
			<div className="table" onScroll={handleScroll}>
				{Aside}
				{MainTable}
				<ModalContainer />
			</div>
		</div>
	);
};

export default TrackerPage;
