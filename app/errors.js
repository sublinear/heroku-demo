function handleError(err, req, res, next) {
	console.error(err.stack);
	res.status(err.status || 500).send();
}

module.exports = handleError;

