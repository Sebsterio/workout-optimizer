export const getUpdateAllList = (all, add, remove) => {
	if (add) return [...all, add];
	else if (remove) return [...all.filter((id) => id !== remove)];
	else return all;
};
