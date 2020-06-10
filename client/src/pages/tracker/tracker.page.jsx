import React, { useEffect, useState } from "react";

import trackerData from "../../utils/tracker.data";

import Column from "../../components/column/column";
import Modal from "../../components/modal/modal";

import "./tracker.scss";

// TODO: add cols on resize
// aside transform on scroll Y, not X
// TODO: single translateX for all table heads; aside head just fixed

const TrackerPage = () => {
	const cellWidth = 100;

	const [colsNum, setColsNum] = useState(1); // n of cols loaded
	const [tableContentWidth, setTableContentWidth] = useState(0);
	const [scrollX, setScrollX] = useState(0); // table scroll left
	const [scrollY, setScrollY] = useState(0); // table scroll top
	const [firstRenderedCol, setFirstRenderedCol] = useState(0); // arr index
	const [lastRenderedCol, setLastRenderedCol] = useState(99); // arr index

	// TEMP
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalData, setModalData] = useState({});
	const addEntry = (data) => {
		setModalData(data);
		setIsModalOpen(true);
	};

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

	const { bodyParts } = trackerData.protocol;

	const Aside = (
		<div className="table__aside" style={translateX}>
			<div className="table__aside-head" style={translateY}>
				^ {/* expand/collapse header button */}
			</div>
			{bodyParts.map((bodyPart, i) => (
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
					<Column
						isVisible={isColVisible(i)}
						headOffsetY={translateY}
						dateOffset={2 - i}
						key={i}
						addEntry={addEntry}
					/>
				))}
		</div>
	);

	return (
		<div className="page tracker">
			<div className="table" onScroll={handleScroll}>
				{Aside}
				{MainTable}
				{isModalOpen && (
					<Modal data={modalData} closeModal={() => setIsModalOpen(false)} />
				)}
			</div>
		</div>
	);
};

export default TrackerPage;
