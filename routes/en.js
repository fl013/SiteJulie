var express = require('express');
var router = express.Router();
Photo = require('../models/photo');
Video = require('../models/video');
var middleware = require('../middleware');
var { isLoggedIn } = middleware;

/////////HOMEPAGE///////////////////////////////////////////
router.get('/home', function(req, res) {
	Photo.find({ utilite: 'homePage' }, function(err, photoHome) {
		if (err) {
			console.log(err);
		}
		{
			res.render('homeEN.ejs', { photoHome, photoHome });
		}
	});
});

router.put('/home', function(req, res) {
	Photo.findOneAndUpdate({ utilite: 'homePage' }, req.body.photoHome, function(err, photoHome) {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/en/home');
		}
	});
});

router.get('/biographie', function(req, res) {
	res.render('aboutmeEN.ejs');
});
router.get('/cv', function(req, res) {
	res.render('cv.ejs');
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

////////ROUTES AVEC MODIFICATION ///////////////

router.get('/photos', function(req, res) {
	Photo.find({}, function(err, photofound) {
		if (err) {
			console.log(err);
		}
		{
			res.render('photosEN.ejs', { photos: photofound });
		}
	});
});

//////////////NEW PHOTOOOS///////////////////////

router.get('/photos/new', isLoggedIn, function(req, res) {
	res.render('photos/newPhoto.ejs');
});

router.post('/photos', isLoggedIn, function(req, res) {
	Photo.create(req.body.photo, function(err, photo) {
		if (err) {
			console.log(err);
		}
		{
			req.flash('success', 'Photo postée');
			res.redirect('/en/photos');
		}
	});
});

/////////////////////UPDTATE/////////////////
router.get('/photos/:id/edit', isLoggedIn, function(req, res) {
	Photo.findById(req.params.id, function(err, photofound) {
		if (err) {
			console.log(err);
		}
		{
			res.render('photos/editPhoto.ejs', { photo: photofound });
		}
	});
});
router.put('/photos/:id', isLoggedIn, function(req, res) {
	Photo.findByIdAndUpdate(req.params.id, req.body.photo, function(err, photofound) {
		if (err) {
			console.log(err);
		} else {
			req.flash('success', 'Photo updated');
			res.redirect('/en/photos');
		}
	});
});

////////////////////////////DELETE PHOTO////////////////////////////////////////

router.delete('/photos/:id', isLoggedIn, function(req, res) {
	Photo.findByIdAndDelete(req.params.id, function(err, video) {
		if (err) {
			console.log(err);
		}
		{
			req.flash('success', 'Photo supprimée');
			res.redirect('/en/photos');
		}
	});
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////VIDEOS///////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/videos', function(req, res) {
	Video.find({}, function(err, videofound) {
		if (err) {
			console.log(err);
		}
		{
			res.render('videosEN.ejs', { videos: videofound });
		}
	});
});
////////NEW*///////////////////////////
router.get('/videos/new', isLoggedIn, function(req, res) {
	res.render('videos/newVideo.ejs');
});

router.post('/videos', isLoggedIn, function(req, res) {
	Video.create(req.body.video, function(err, video) {
		if (err) {
			console.log(err);
		}
		{
			req.flash('success', 'Video postée');
			res.redirect('/en/videos');
		}
	});
});
/////////////////////UPDTATE/////////////////
router.get('/videos/:id/edit', isLoggedIn, function(req, res) {
	Video.findById(req.params.id, function(err, videofound) {
		if (err) {
			console.log(err);
		}
		{
			res.render('videos/editVideo.ejs', { video: videofound });
		}
	});
});

router.put('/videos/:id', isLoggedIn, function(req, res) {
	Video.findByIdAndUpdate(req.params.id, req.body.video, function(err, videofound) {
		if (err) {
			console.log(err);
		} else {
			req.flash('success', 'Video updated');
			res.redirect('/en/videos');
		}
	});
});

//////////////////DELETE///////////////////////////////////
router.delete('/videos/:id', isLoggedIn, function(req, res) {
	Video.findByIdAndDelete(req.params.id, function(err, video) {
		if (err) {
			console.log(err);
		} else {
			req.flash('success', 'Photo supprimée');
			res.redirect('/en/videos');
		}
	});
});
module.exports = router;
