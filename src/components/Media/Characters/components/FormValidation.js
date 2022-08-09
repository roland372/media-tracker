const validation = title => {
	const errors = {};
	if (!title) {
		errors.title = 'Name cannot be empty';
	}

	return errors;
};

export default validation;
