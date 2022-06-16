export const sortString = (
	column,
	order,
	menuItems,
	setMenuItems,
	setOrder
) => {
	if (order === 'ASC') {
		const sorted = [...menuItems].sort((a, b) =>
			a[column] > b[column] ? 1 : -1
		);
		setMenuItems(sorted);
		setOrder('DSC');
	}
	if (order === 'DSC') {
		const sorted = [...menuItems].sort((a, b) =>
			a[column] < b[column] ? 1 : -1
		);
		setMenuItems(sorted);
		setOrder('ASC');
	}
};

export const sortNumber = (
	column,
	order,
	menuItems,
	setMenuItems,
	setOrder
) => {
	if (order === 'ASC') {
		const sorted = [...menuItems].sort((a, b) => a[column] - b[column]);
		setMenuItems(sorted);
		setOrder('DSC');
	}
	if (order === 'DSC') {
		const sorted = [...menuItems].sort((a, b) => b[column] - a[column]);
		setMenuItems(sorted);
		setOrder('ASC');
	}
};


// const sortedAnime = allAnime.sort(function (a, b) {
// 	const nameA = a.title.toLowerCase(),
// 		nameB = b.title.toLowerCase();
// 	if (nameA < nameB)
// 		//sort string ascending
// 		return -1;
// 	if (nameA > nameB) return 1;
// 	return 0; //default return value (no sorting)
// });
