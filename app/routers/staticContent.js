var router = require('express').Router();

router.get('/:name', getFile);
router.get('/', getIndex);

function sendFile(name, res, next) {
	var options = {
		root: global.config.appContent,
		dotfiles: 'ignore'
	};

	res.sendFile(name, options, function (err) {
		if (err) {
			next(err);
		}
	});
}

function getFile(req, res, next) {
	var name = req.params.name;
	var ignoredNames = ['index.html'];

	if (ignoredNames.indexOf(name) >= 0) {
		next();
	}
	else {
		sendFile(name, res, next);
	}
}

function getIndex(req, res, next) {
	var name = 'index.html';
	sendFile(name, res, next);
}

module.exports = router;

