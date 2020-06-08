import React, { useEffect, useState } from "react";

import "./tracker.scss";

// ignore planning feature. build table from today + 2 (on the left), going right until 2 days after screen edge

const TrackerPage = () => {
	const [scroll, setScroll] = useState({ left: 0, top: 0 }); // x,y

	useEffect(() => {}, []);

	const handleScroll = (e) => {
		console.log(e.target.scrollLeft, e.target.scrollTop);
		setScroll({
			left: e.target.scrollLeft,
			top: e.target.scrollTop,
		});
	};

	const colsNum = 10;
	const rowsNum = 10;

	const translateX = { transform: `translateX(${scroll.left}px)` };
	const translateY = { transform: `translateY(${scroll.top}px)` };

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
									A
								</div>
							))}
					</div>
				</div>

				<div className="table__main">
					{Array(colsNum)
						.fill("")
						.map((col, i) => (
							<div className="table__col" key={i}>
								<div className="table__col-head" style={translateY}>
									H
								</div>
								{Array(rowsNum)
									.fill("A")
									.map((col, i) => (
										<div className="table__cell" key={i}>
											<div className="table__marker"></div>
										</div>
									))}
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default TrackerPage;
