const getDate = (sourceDate, offset) => {
	const date = new Date(sourceDate);
	date.setDate(date.getDate() + offset);
	const dateStr = date.toDateString();
	const dateArr = dateStr.split(" ");
	const weekDay = dateArr[0];
	const monthDay = dateArr[2];

	return { dateStr, weekDay, monthDay };
};

export default getDate;
