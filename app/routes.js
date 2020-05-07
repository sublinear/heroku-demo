var router = require('express').Router();
var staticContent = require('./routers/staticContent.js');
var notes = require('./routers/notes.js');

router.use('/notes', notes);
router.use('/', staticContent);

module.exports = router;

