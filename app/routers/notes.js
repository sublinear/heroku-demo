var router = require('express').Router();

var noteSerial = 0;
var notes = {};

router.post('/', createNote);
router.get('/', retrieveNotes);
router.put('/', updateNote);
router.delete('/', deleteNote);

function createNote(req, res, next) {
	// Organize the request
	var request = {
		note: req.body.note
	};

	// Add to notes
	var id = String(noteSerial);
	notes[id] = request.note;

	noteSerial += 1;

	// Generate a response
	var response = {
		success: true,
		message: 'Added a note',
		responseData: {
			id: id
		}
	};

	// Send the response
	res.json(response);
}

function retrieveNotes(req, res, next) {
	// Organize the request
	var request = {
		id: req.query.id
	};

	// Determine how to retrieve
	var retrieveAllNotes = request.id === undefined;

	// Retrieve the notes
	var retrievedNotes = {};
	var responseMessage = '';
	if (retrieveAllNotes) {
		retrievedNotes = notes;
		responseMessage = 'Retrieved all notes';
	}
	else {
		retrievedNotes[request.id] = notes[request.id];
		responseMessage = 'Retrieved note';
	}

	// Generate a response
	var response = {
		success: true,
		message: responseMessage,
		responseData: {
			notes: retrievedNotes
		}
	};

	// Send the response
	res.json(response);
}

function updateNote(req, res, next) {
	// Organize the request
	var request = {
		id: req.body.id,
		note: req.body.note
	};

	// Update the note
	notes[request.id] = request.note;

	// Generate a response
	var response = {
		success: true,
		message: 'Updated note',
		responseData: {
			id: request.id
		}
	};

	// Send the response
	res.json(response);
}

function deleteNote(req, res, next) {
	// Organize the request
	var request = {
		id: req.body.id
	};

	// Update the note
	delete notes[request.id];

	// Generate a response
	var response = {
		success: true,
		message: 'Deleted note',
		responseData: {
			id: request.id
		}
	};

	// Send the response
	res.json(response);
}

module.exports = router;

