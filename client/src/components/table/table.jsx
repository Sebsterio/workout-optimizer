import React from "react";
import shortid from "shortid";

import "./table.scss";

export const TableCell = ({ children, head }) => {
	return head ? (
		<th className="table__cell">{children}</th>
	) : (
		<td className="table__cell">{children}</td>
	);
};

export const Table = ({
	headCells, // array of cells
	emptyCornerCell, // add empty left-most head cell
	bodyRows, // array of rows (row = array of cells)
}) => (
	<table className="table">
		<thead>
			<tr className="table__row">
				{emptyCornerCell && <TableCell head />}
				{headCells.map((cell) => (
					<TableCell head key={shortid.generate()}>
						{cell}
					</TableCell>
				))}
			</tr>
		</thead>
		<tbody>
			{bodyRows.map(
				(row) =>
					row && (
						<tr className="table__row" key={shortid.generate()}>
							{row.map((cell) => (
								<TableCell key={shortid.generate()}>{cell}</TableCell>
							))}
						</tr>
					)
			)}
		</tbody>
	</table>
);
