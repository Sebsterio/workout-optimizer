import React, { useEffect, useState } from "react";

import "./tracker.scss";

// ignore planning feature. build table from today + 2 (on the left), going right until 2 days after screen edge

const TrackerPage = () => {
	const cellWidth = 100;
	const rowsNum = 10;

	const [colsNum, setColsNum] = useState(1); // cols loaded
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

	const handleScrollX = (e, scrollLeft) => {
		// only populate cols/cells in view
		const tableWidth = e.target.offsetWidth;
		const firstVisibleCol = Math.floor(scrollLeft / cellWidth);
		const visibleColsNum = Math.floor((tableWidth - cellWidth) / cellWidth);
		const lastVisibleCol = firstVisibleCol + visibleColsNum;
		setFirstRenderedCol(firstVisibleCol > 0 ? firstVisibleCol - 1 : 0);
		setLastRenderedCol(lastVisibleCol + 1);

		// insert new column if scrolled near right edge
		if (scrollLeft + tableWidth >= tableContentWidth) {
			setColsNum(colsNum + 1);
			setTableContentWidth(colsNum * cellWidth);
		}
	};

	const handleScroll = (e) => {
		const scrollLeft = e.target.scrollLeft;
		if (scrollLeft != scrollX) handleScrollX(e, scrollLeft);

		// set both in either case due to setState lag
		setScrollY(e.target.scrollTop);
		setScrollX(scrollLeft);
	};

	const translateX = { transform: `translateX(${scrollX}px)` };
	const translateY = { transform: `translateY(${scrollY}px)` };

	return (
		<div className="page tracker">
			<div className="table" onScroll={handleScroll}>
				<div className="table__aside" style={translateX}>
					<div className="table__col">
						<div className="table__col-head" style={translateY}>
							H
						</div>
						{Array(rowsNum)
							.fill("")
							.map((cell, i) => (
								<div className="table__cell" key={i}>
									X
								</div>
							))}
					</div>
				</div>

				<div className="table__main">
					{Array(colsNum)
						.fill("")
						.map((col, i) => {
							if (i < firstRenderedCol || i > lastRenderedCol)
								return <div className="table__empty-col" key={i}></div>;
							else
								return (
									<div className="table__col" key={i}>
										<div className="table__col-head" style={translateY}>
											{i}
										</div>
										{Array(rowsNum)
											.fill("A")
											.map((col, i) => (
												<div className="table__cell" key={i}>
													<div className="table__marker"></div>
												</div>
											))}
									</div>
								);
						})}
				</div>
			</div>
		</div>
	);
};

export default TrackerPage;
