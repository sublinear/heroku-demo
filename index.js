// Libraries
var path = require('path');
var express = require('express');
var routes = require('./app/routes.js');
var errors = require('./app/errors.js');

// Configuration
global.config = {
	appContent: path.join(__dirname, 'appContent'),
	port: process.env.PORT || 5000
};

// Build and run app
app = express();
app.use(express.json());
app.use(routes);
app.use(errors);
app.listen(global.config.port);

console.log('Listening on port ' + global.config.port + '...');

