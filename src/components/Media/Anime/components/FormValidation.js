const validation = title => {
	const errors = {};
	if (!title) {
		errors.title = 'Title cannot be empty';
	}
	return errors;
};

export default validation;
