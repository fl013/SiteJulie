var express = require('express');
var router = express.Router();

router.get('/home', function(req, res) {
	res.render('homeFR.ejs');
});
router.get('/biographie', function(req, res) {
	res.render('aboutmeFR.ejs');
});
router.get('/cv', function(req, res) {
	res.render('cv.ejs');
});
router.get('/photos', function(req, res) {
	res.render('photos/photosFR.ejs');
});
router.get('/videos', function(req, res) {
	res.render('videosFR.ejs');
});
router.get('/performances', function(req, res) {
	res.render('performancesFR.ejs');
});
router.get('/news', function(req, res) {
	res.render('newsFR.ejs');
});
router.get('/contact', function(req, res) {
	res.render('contactFR.ejs');
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	}

	{
		res.redirect('/login');
	}
}

module.exports = router;
