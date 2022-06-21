const validation = title => {
	const errors = {};
	// console.log(typeof episodesMin);
	// console.log(typeof episodesMax);
	if (!title) {
		errors.title = 'Title cannot be empty';
	}
	// if (episodesMin > episodesMax) {
	// 	errors.episodes = 'Episodes min cannot be greater than episodes max';
	// }
	return errors;
};

export default validation;
