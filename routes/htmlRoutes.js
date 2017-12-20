var htmlCont = require('../controllers/htmlcont.js');
module.exports = function(app) {
	app.get("/", htmlCont.home);

	// Route to the cms page
	app.get("/dash", htmlCont.dash);
};