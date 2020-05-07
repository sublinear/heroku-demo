function pageLoad() {
	// Use mobile CSS if needed
	if (isMobile()) {
		document.querySelector('link[href="default.css"]').disabled = true;
		document.querySelector('link[href="mobile.css"]').disabled = false;
	}

	// Fetch the list of notes
	refreshList();
}

function refreshList() {
	retrieveNotes(function (res) {
		var list = document.querySelector('#noteList');

		// Clear the list
		list.innerHTML = '';

		// Initialize the note input form
		clearNoteInput();

		// Prepare notes from response data
		var notesObj = res.responseData.notes;
		var notes = Object.keys(notesObj).map(function (id) {
			return {
				id: id,
				note: notesObj[id]
			};
		}).reverse();

		populateList(list, notes);
	});
}

function populateList(list, notes) {
	var lastClicked = null;

	notes.forEach(function (noteItem) {
		var listElem = document.createElement('li');

		// Define the displayed text
		var charLimit = 20;
		var notePreview = noteItem.note.slice(0, charLimit);
		notePreview += noteItem.note.length > charLimit ? '...' : '';
		listElem.innerText = '#' + noteItem.id + ': ' + notePreview;

		// Handle click events
		listElem.addEventListener('click', function () {
			var isSelected = listElem.hasAttribute('selected');

			// Toggle the selection when clicking the same element
			if (isSelected) {
				listElem.removeAttribute('selected');
				clearNoteInput();
			}
			else {
				listElem.setAttribute('selected', '');
				populateNoteInput(noteItem);
			}

			// Only one element can be selected at a time
			if (lastClicked && lastClicked !== listElem) {
				lastClicked.removeAttribute('selected');
			}

			lastClicked = listElem;
		});

		// Add the element to the list
		list.appendChild(listElem);
	});
}

function clearNoteInput() {
	populateNoteInput({ id: '', note: '' });
}

function populateNoteInput(noteItem) {
	var textarea = document.querySelector('#noteInput > textarea');
	var saveButton = document.querySelector('#noteInput > button');

	// Set the textarea value
	textarea.value = noteItem.note;

	// Handle save button click
	saveButton.onclick = function () {
		// Create a new note
		if (!noteItem.id) {
			if (textarea.value) {
				createNote(textarea.value, function (res) {
					alert(res.message);
					refreshList();
				});
			}
		}

		else {
			// Update an existing note
			if (textarea.value) {
				updateNote(noteItem.id, textarea.value, function (res) {
					alert(res.message);
					refreshList();
				});
			}

			// Delete an existing note
			else {
				deleteNote(noteItem.id, function (res) {
					alert(res.message);
					refreshList();
				});
			}
		}
	};
}

function createNote(note, callback) {
	var req = {
		note: note
	};

	makeRequest('POST', '/notes', req, callback);
}

function retrieveNotes(callback) {
	makeRequest('GET', '/notes', null, callback);
}

function updateNote(id, note, callback) {
	var req = {
		id: id,
		note: note
	};

	makeRequest('PUT', '/notes', req, callback);
}

function deleteNote(id, callback) {
	var req = {
		id: id
	};

	makeRequest('DELETE', '/notes', req, callback);
}

window.addEventListener('load', pageLoad);

