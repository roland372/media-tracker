const validation = name => {
	const errors = {};
	if (!name) {
		errors.name = 'Name cannot be empty';
	}

	return errors;
};

export default validation;
