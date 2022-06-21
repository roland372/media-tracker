const validation = title => {
	const errors = {};
	// console.log(typeof episodesMin);
	// console.log(typeof episodesMax);
	if (!title) {
		errors.title = 'Title cannot be empty';
	}
	// if (chaptersMin > chaptersMax) {
	// 	errors.chapters = 'Chapters min cannot be greater than chapters max';
	// }
	// if (volumesMin > volumesMax) {
	// 	errors.volumes = 'Volumes min cannot be greater than volumes max';
	// }
	return errors;
};

export default validation;
