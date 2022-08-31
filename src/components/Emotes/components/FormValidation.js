const validation = (name, url) => {
	const errors = {};
	if (!name) {
		errors.name = 'Name cannot be empty';
	}
	if (!url) {
		errors.url = 'URL cannot be empty';
	}
	return errors;
};

export default validation;
