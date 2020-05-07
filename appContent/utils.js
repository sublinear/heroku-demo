function makeRequest(method, uri, data, callback) {
	var req = new XMLHttpRequest();

	req.addEventListener('load', function () {
		callback(JSON.parse(this.responseText));
	});

	req.open(method, uri);

	if (data) {
		req.setRequestHeader('Content-Type', 'application/json')
		req.send(JSON.stringify(data));
	}
	else {
		req.send();
	}
}

function isMobile() {
	var userAgents = [
		/Android/i,
		/webOS/i,
		/iPhone/i,
		/iPad/i,
		/iPod/i,
		/BlackBerry/i,
		/Windows Phone/i
	];

	return userAgents.some(function (agentRegex) {
		return navigator.userAgent.match(agentRegex);
	});
}

