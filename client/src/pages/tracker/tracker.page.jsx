import React, { useEffect, useState, useRef } from "react";

import ColumnContainer from "../../components/column/column.container";
import ModalContainer from "../../components/modal/modal.container";
import LogSpinner from "../../components/log-spinner/log-spinner.container";

import "./tracker.scss";

// TODO
// near edge debounce scroll
// drag to scroll

// const isFirstRender = React.useRef(true);
// if (isFirstRender.current) {
// 	isFirstRender.current = false;
// 	return;
// }

const TrackerPage = ({ areas }) => {
	const cellSize = 100; // -> store.settings

	const [tableScrollLeft, setTableScrollLeft] = useState(0);
	const [tableScrollTop, setTableScrollTop] = useState(0);
	const [cols, setCols] = useState(0); // N of cols loaded
	const [maxDateOffset, setMaxDateOffset] = useState(0); // first col loaded
	const [hasRendered, setHasRendered] = useState(false);

	const tableRef = useRef(null);

	// -------------------- Mount --------------------

	useEffect(() => {
		const { offsetWidth } = tableRef.current;

		// Load enough columns to overflow table
		const newTotalCols = Math.ceil(offsetWidth / cellSize) + 2;
		setCols(newTotalCols);
		setMaxDateOffset(1); // useEffect will immediately add 1
		setHasRendered(true);

		tableRef.current.scrollLeft += cellSize;

		window.addEventListener("resize", () => {
			// tableWidth = tableRef.current.offsetWidth;
			// handleScroll();
		});
	}, []);

	// next:
	useEffect(() => {
		tableRef.current.scrollLeft += cellSize;
	}, [hasRendered]);

	// -------------------- Scroll --------------------

	const SCROLL_X_THRESHOLD = 50;

	// after scroll re-render, run fake scroll
	useEffect(() => {
		const { offsetWidth, scrollWidth } = tableRef.current;
		const tableScrollRight = scrollWidth - offsetWidth - tableScrollLeft;

		// left edge
		if (tableScrollLeft <= SCROLL_X_THRESHOLD /*  && deltaX < 0 */) {
			setMaxDateOffset((maxDateOffset) => maxDateOffset + 1);
			tableRef.current.scrollLeft += cellSize;
		}

		// right edge
		else if (tableScrollRight <= SCROLL_X_THRESHOLD /* && deltaX > 0 */) {
			setMaxDateOffset((maxDateOffset) => maxDateOffset - 1);
			tableRef.current.scrollLeft -= cellSize;
		}
	}, [tableScrollLeft]);

	// On scroll, re-render
	const handleScroll = () => {
		const { scrollLeft, scrollTop } = tableRef.current;
		if (tableScrollTop !== scrollTop) setTableScrollTop(scrollTop);
		if (tableScrollLeft !== scrollLeft) setTableScrollLeft(scrollLeft);
	};

	// -------------------- Render --------------------

	const translateY = { transform: `translateY(${tableScrollTop}px)` };
	const reverseTranslateY = { transform: `translateY(${-tableScrollTop}px)` };

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

	const hideScrollBar = false;
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
