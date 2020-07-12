import React, { useState, useEffect } from "react";
import "./tracker-table.scss";

// NOTE: Using fakePadding html element instead of CSS padding prop
// due to tableSide having {position: sticky}

const TrackerTable = ({
	sideColumn,
	children,
	tableRef,
	setFirstDayRendered,
	cellSize,
}) => {
	const SCROLL_X_THRESHOLD = cellSize;
	const TABLE_X_PADDING = cellSize * 10;

	const [hasRendered, setHasRendered] = useState(false);
	const [paddingLeft, setPaddingLeft] = useState(TABLE_X_PADDING);
	const [paddingRight, setPaddingRight] = useState(TABLE_X_PADDING);

	// After first render, center scroll
	useEffect(() => {
		const { offsetWidth, scrollWidth } = tableRef.current;
		tableRef.current.scrollLeft = (scrollWidth - offsetWidth) / 2;
		setHasRendered(true);
	}, [hasRendered, tableRef]);

	// Render cols in visible area of table and fakePadding outside of it
	const fakeScrollX = (direction, buffer, remainingPadding) => {
		const sign = direction === "left" ? -1 : 1;
		const multiplier = Math.abs(Math.floor(buffer / cellSize));
		const step = sign * multiplier;

		// "Shift" all cols by 1 step
		setFirstDayRendered((firstDayRendered) => firstDayRendered + step);

		// Scrolling not near edge:
		// Adjust fakePadding to keep tableContent within visible part of table
		if (remainingPadding > SCROLL_X_THRESHOLD) {
			setPaddingLeft(paddingLeft + step * cellSize);
			setPaddingRight(paddingRight - step * cellSize);
		}
		// Scrolling near edge:
		// Jump-scroll to appear static in rel to newly "shifted" cols
		else tableRef.current.scrollLeft -= step * cellSize;
	};

	const handleScroll = () => {
		const { scrollLeft, offsetWidth, scrollWidth } = tableRef.current;
		const scrollRight = scrollWidth - offsetWidth - scrollLeft;

		// Width of tableContent sections that aren't visible on either side
		const bufferLeft = scrollLeft - paddingLeft;
		const bufferRight = scrollRight - paddingRight;

		if (bufferLeft < SCROLL_X_THRESHOLD) {
			fakeScrollX("left", bufferLeft, paddingLeft);
		} else if (bufferRight < SCROLL_X_THRESHOLD) {
			fakeScrollX("right", bufferRight, paddingRight);
		}
	};

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
