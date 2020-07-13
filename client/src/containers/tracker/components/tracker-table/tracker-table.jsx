import React, { useState, useEffect } from "react";
import "./tracker-table.scss";

// NOTE: Using fakePadding html element instead of CSS padding prop
// due to tableSide having {position: sticky};
// TODO: use {transform: translate} on tableContent

const TrackerTable = ({
	sideColumn,
	children,
	tableRef,
	setFirstDayRendered,
	cellSize,
}) => {
	const TABLE_X_PADDING = 15 * cellSize;
	const SCROLL_X_THRESHOLD = cellSize;
	const SCROLL_X_THRESHOLD_NEAR_EDGE = 300;

	const [hasRendered, setHasRendered] = useState(false);
	const [paddingLeft, setPaddingLeft] = useState(TABLE_X_PADDING);
	const [paddingRight, setPaddingRight] = useState(TABLE_X_PADDING);

	// After first render, center scroll
	useEffect(() => {
		const { offsetWidth, scrollWidth } = tableRef.current;
		tableRef.current.scrollLeft = (scrollWidth - offsetWidth) / 2;
		setHasRendered(true);
	}, [hasRendered, tableRef]);

	// ------------------------- Scroll --------------------------

	// "Shift" cols by 1 &&
	// jump-scroll by 1 col width to appear static in relation cols
	const fakeScroll = (sign, space) => {
		const stepsToShift = sign * Math.abs(Math.ceil(space / cellSize));
		setFirstDayRendered(
			(firstDayRendered) => firstDayRendered + stepsToShift * 1
		);
		tableRef.current.scrollLeft -= stepsToShift * cellSize;
	};

	// "Shift" cols by a number of steps &&
	// adjust fakePadding to keep tableContent within visible part of table
	const moveContent = (sign, buffer) => {
		const stepsToShift = sign * (Math.abs(Math.ceil(buffer / cellSize)) + 1);
		setFirstDayRendered((firstDayRendered) => firstDayRendered + stepsToShift);
		setPaddingLeft(paddingLeft + stepsToShift * cellSize);
		setPaddingRight(paddingRight - stepsToShift * cellSize);
	};

	const handleScroll = () => {
		const { scrollLeft, offsetWidth, scrollWidth } = tableRef.current;
		const scrollRight = scrollWidth - offsetWidth - scrollLeft;

		// Scrolling near table edge
		if (scrollLeft < SCROLL_X_THRESHOLD_NEAR_EDGE) {
			const surplusSpace = SCROLL_X_THRESHOLD_NEAR_EDGE - scrollLeft;
			fakeScroll(-1, surplusSpace);
		} else if (scrollRight < SCROLL_X_THRESHOLD_NEAR_EDGE) {
			const surplusSpace = SCROLL_X_THRESHOLD_NEAR_EDGE - scrollRight;
			fakeScroll(1, surplusSpace);
		}

		// Scrolling near tableContent edge (i.e. getting near fakePadding)
		else {
			// Width of tableContent sections that aren't visible on either side
			const bufferLeft = scrollLeft - paddingLeft;
			const bufferRight = scrollRight - paddingRight;

			if (bufferLeft < SCROLL_X_THRESHOLD) moveContent(-1, bufferLeft);
			else if (bufferRight < SCROLL_X_THRESHOLD) moveContent(1, bufferRight);
		}
	};

	// ------------------------- Render --------------------------

	return (
		<div className="tracker-table" ref={tableRef} onScroll={handleScroll}>
			<div className="tracker-table__side">{sideColumn}</div>

			<div
				className="tracker-table__fake-padding"
				style={{ width: paddingLeft + "px" }}
			></div>

			<div className="tracker-table__content">{children}</div>

			<div
				className="tracker-table__fake-padding"
				style={{ width: paddingRight + "px" }}
			></div>
		</div>
	);
};

export default TrackerTable;
