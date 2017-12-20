var authCont = require('../controllers/authcont.js');

module.exports = function(app, passport) {
	app.get('/auth/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/calendar',
		'https://www.googleapis.com/auth/calendar.readonly', 'https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'], accessType: 'offline', prompt: 'consent' }), function(req, res){});

	app.get('/auth/google/dash', passport.authenticate('google',
		{
			successRedirect: '/',
			failureRedirect: '/'
		}
	));

	app.get('/auth/twitter', passport.authorize('twitter', {scope: 'email'}));

	app.get('/auth/twitter/dash', passport.authenticate('twitter',
		{
			successRedirect: '/',
			failureRedirect: '/'
		}
	));

	app.get('/auth/session', function(req, res){
		if(!req.user){
			res.json({});
		}else {
			res.send(req.user);
		}
		console.log(req.user);
	});

	app.get('/auth/facebook', passport.authorize('facebook', {scope: ['public_profile', 'email']}), function(req, res){});

	app.get('/auth/facebook/dash', passport.authorize('facebook',
		{
			successRedirect: '/',
			failureRedirect: '/'
		}
	));

	app.get('/auth/linkedin', passport.authorize('linkedin', { scope: ['r_basicprofile', 'r_emailaddress']}), function(req, res){});

	app.get('/auth/linkedin/dash', passport.authenticate('linkedin',
		{
			successRedirect: '/',
			failureRedirect: '/'
		}
	));

	app.get('auth/current', function(req, res) {
		if(!req.user){
			res.json({});
		}else {
			console.log(req.user);
		}
	});


	function isLoggedIn(req, res, next) {
	    if (req.isAuthenticated()){
	        return next();
	    }
	    res.redirect('/');
	}
};
