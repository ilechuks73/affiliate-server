const validateBody = (schema) => {
	return async (req, res, next) => {
		schema
			.validateAsync(req.body)
			.then((value) => {
				if (value) next();
			})
			.catch(next)
	};
};

module.exports = validateBody