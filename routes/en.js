var express = require('express');
var router = express.Router();

router.get('/home', function(req, res) {
	res.render('homeEN.ejs');
});
router.get('/biographie', function(req, res) {
	res.render('aboutmeEN.ejs');
});
router.get('/cv', function(req, res) {
	res.render('cv.ejs');
});
router.get('/photos', function(req, res) {
	res.render('photosEN.ejs');
});
router.get('/videos', function(req, res) {
	res.render('videosEN.ejs');
});
router.get('/performances', function(req, res) {
	res.render('performancesEN.ejs');
});
router.get('/news', function(req, res) {
	res.render('newsEN.ejs');
});
router.get('/contact', function(req, res) {
	res.render('contactEN.ejs');
});

module.exports = router;
