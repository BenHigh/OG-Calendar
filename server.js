const express = require("express");
const bodyParser = require("body-parser");
const flash = require('connect-flash');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const cookieSession = require('cookie-session');
const mongoose = require("mongoose");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3001;

/*==============================================================================
connecting to the events.js section
===============================================================================*/
var Event = require("./models/events.js");

//needed to be able to talk to the schemas (?)
mongoose.Promise = Promise;

//???
var databaseUri = 'mongodb://localhost/calendar';
//if able to connect to heroku do so, otherwise connect to local database
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    useMongoClient: true
  });
} else {
  mongoose.connect(databaseUri, {
    useMongoClient: true
  });
}

// Configure body parser for AJAX requests
app.use(express.static("client/build"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(morgan('dev'));
app.use(cookieSession({
	name: 'session',
	secret: 'cookie monster mad sesh',
	maxAge: 30 * 60 * 1000,
	secure: false,
	overwrite: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(session({ secret: 'monsieur miyagi'}));
app.use(flash());

require('./config/passport/passport.js')(app, passport);

// Add routes, both API and view
require("./routes/htmlRoutes.js")(app);
require("./routes/authRoutes.js")(app, passport);
require("./routes/apiRoutes.js")(app);
// require("./routes/api/meetup.js")(app);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/calendar",
  {
    useMongoClient: true
  }
);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> Server now listening on PORT ${PORT}!`);
});
