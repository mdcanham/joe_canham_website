// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

// Require keystone
var keystone = require('keystone');
var express = require('express');
app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': 'Joe Canham Portfolio',
	'brand': 'Joe Canham Portfolio',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',

	'mongo': process.env.MONGO_URI || "mongodb://localhost/keystone-portfolio"

});

keystone.set('cloudinary config', {
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

keystone.set('cloudinary secure', true);

keystone.app = app;
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'videos': ['videos', 'categories'],
	'users': 'users',
	'skills': 'skills'
});

// Start Keystone to connect to your database and initialise the web server

keystone.set('port', process.env.PORT || 3000);

keystone.start();
