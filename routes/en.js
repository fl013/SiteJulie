var express = require('express');
var router = express.Router();
Photo = require('../models/photo');
Video = require('../models/video');
Event = require('../models/event');
Perf = require('../models/perf');
var middleware = require('../middleware');
var { isLoggedIn } = middleware;
const nodemailer = require('nodemailer');

require('dotenv').config();

/////////HOMEPAGE///////////////////////////////////////////
router.get('/about', function(req, res) {
	Photo.find({ utilite: 'homePage' }, function(err, photoHome) {
		if (err) {
			console.log(err);
		}
		{
			res.render('aboutmeEN.ejs', { photoHome, photoHome });
		}
	});
});

router.put('/home', function(req, res) {
	Photo.findOneAndUpdate({ utilite: 'homePage' }, req.body.photoHome, function(err, photoHome) {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/en/about');
		}
	});
});

router.get('/biographie', function(req, res) {
	res.render('aboutmeEN.ejs');
});
router.get('/cv', function(req, res) {
	res.render('cv.ejs');
});

////////ROUTES AVEC MODIFICATION ////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////CONTACT/////////////////////////////////////////////////////////////
router.get('/contact', function(req, res) {
	res.render('contactEN.ejs');
});

router.post('/contact', function(req, res) {
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD
		}
	});

	let mailOptions = {
		from: 'nouveau.compte.flo@gmail.com',
		to: 'florian.demont@outlook.com',
		subject: req.body.email,
		text: req.body.texte
	};

	transporter.sendMail(mailOptions, function(err, date) {
		if (err) {
			console.log('error', err);
		} else {
			console.log('email send!');
		}
	});
	res.redirect('/en/contact');
});
///////////////////////////////////////////////EVENTS////////////////////////////////////////////////////////

///////////////PAGE EVENTS///////////////////////////
router.get('/events', function(req, res) {
	Event.find({}, function(err, eventsfound) {
		if (err) {
			console.log(err);
		}
		{
			var x;
			var j;

			for (let i = 0; i < eventsfound.length; i++) {
				x = eventsfound[i];

				j = i;
				while (j > 0 && eventsfound[j - 1].dateDebut < x.dateDebut) {
					eventsfound[j] = eventsfound[j - 1];
					j = j - 1;
				}
				eventsfound[j] = x;
			}
			res.render('events/eventEN.ejs', { events: eventsfound });
		}
	});
});

//////////////NEW EVENT///////////////////////////////////////////
router.get('/events/new', isLoggedIn, function(req, res) {
	res.render('events/newEvent.ejs');
});

router.post('/events', isLoggedIn, function(req, res) {
	Event.create(req.body.event, function(err, eventfound) {
		if (err) {
			console.log(err);
		} else {
			req.flash('success', 'Event posted');
			res.redirect('/en/events');
		}
	});
});

/////////////////////UPDTATE EVENT////////////////////////////////
router.get('/events/:id/edit', isLoggedIn, function(req, res) {
	Event.findById(req.params.id, function(err, eventfound) {
		if (err) {
			console.log(err);
		} else {
			res.render('events/editEvent.ejs', { event: eventfound });
		}
	});
});

router.put('/events/:id', isLoggedIn, function(req, res) {
	Event.findByIdAndUpdate(req.params.id, req.body.event, function(err, eventfound) {
		if (err) {
			console.log(err);
		} else {
			req.flash('success', 'Event updated');
			res.redirect('/en/events');
		}
	});
});

////////////////////////////DELETE 	EVENT////////////////////////////////////////

router.delete('/events/:id', isLoggedIn, function(req, res) {
	Event.findByIdAndDelete(req.params.id, function(err, event) {
		if (err) {
			console.log(err);
		}
		{
			req.flash('success', 'Event supprimée');
			res.redirect('/en/events');
		}
	});
});

////////////////////////////////////////PHOTOS///////////////////////////////////////////////////////////

//////////////////PAGE PHOTOS//////////////////////////////////
router.get('/photos', function(req, res) {
	Photo.find({}, function(err, photofound) {
		if (err) {
			console.log(err);
		}
		{
			res.render('photos/photosEN.ejs', { photos: photofound });
		}
	});
});

//////////////NEW PHOTOOOS/////////////////////////////////////

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

/////////////////////UPDTATE PHOTOS/////////////////
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
/////////////////////////PERF/////////////////////////////////////////////////////////////////////////

router.get('/performances', function(req, res) {
	Perf.find({}, function(err, perffound) {
		if (err) {
			console.log(err);
		}
		{
			res.render('perfs/performancesEN.ejs', { perfs: perffound });
		}
	});
});

//////////////////////New///////////////////////////////////
router.get('/perfs/new', isLoggedIn, function(req, res) {
	res.render('perfs/newPerf.ejs');
});

router.post('/performances', isLoggedIn, function(req, res) {
	Perf.create(req.body.perf, function(err, perf) {
		if (err) {
			console.log(err);
		}
		{
			req.flash('success', 'Perf postée');
			res.redirect('/en/performances');
		}
	});
});
/////////////////////UPDTATE/////////////////
router.get('/performances/:id/edit', isLoggedIn, function(req, res) {
	Perf.findById(req.params.id, function(err, perffound) {
		if (err) {
			console.log(err);
		}
		{
			res.render('perfs/editPerf.ejs', { perf: perffound });
		}
	});
});

router.get('/performances/:id', isLoggedIn, function(req, res) {
	Perf.findById(req.params.id, function(err, perffound) {
		if (err) {
			console.log(err);
		}
		{
			res.render('perfs/showPerf.ejs', { perf: perffound });
		}
	});
});
router.get('/performances/:id/editImg', isLoggedIn, function(req, res) {
	Perf.findById(req.params.id, function(err, perffound) {
		if (err) {
			console.log(err);
		}
		{
			res.render('perfs/perfImg.ejs', { perf: perffound });
		}
	});
});

router.put('/performances/:id', isLoggedIn, function(req, res) {
	Perf.findByIdAndUpdate(req.params.id, req.body.perf, function(err, perffound) {
		if (err) {
			console.log(err);
		} else {
			req.flash('success', 'Perf updated');
			res.redirect('/en/performances');
		}
	});
});

router.post('/performances/:id/img', isLoggedIn, function(req, res) {
	Perf.findById(req.params.id, function(err, perffound) {
		if (err) {
			console.log(err);
		} else {
			console.log('1');
			perffound.imagePerf.push(req.body.perf.imagePerf);
			perffound.save();
			req.flash('success', 'Perf updatede');
			res.redirect('/en/performances/' + req.params.id + '/editImg');
		}
	});
});
router.put('/performances/:id/img', isLoggedIn, function(req, res) {
	Perf.findById(req.params.id, function(err, perffound) {
		if (err) {
			console.log(err);
		} else {
			console.log('1');
			index = perffound.imagePerf.indexOf(req.body.perf.imagePerf);
			console.log(index);
			perffound.imagePerf.splice(index, 1);

			perffound.save();
			req.flash('success', 'Perf updatede');
			res.redirect('/en/performances/' + req.params.id + '/editImg');
		}
	});
});

// router.put('/performances/:id', isLoggedIn, function(req, res) {
// 	Perf.findByIdAndUpdate(req.params.id, function(err, perffound) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log('1');
// 			perffound.titre = req.body.perf.titre;
// 			req.flash('success', 'Perf updated');
// 			res.redirect('/en/performances');
// 		}
// 	});
// });

// router.put('/performances/:id', isLoggedIn, function(req, res) {
// 	Perf.findById(req.params.id, function(err, perffound) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log('ok');
// 			perffound.imagePerf.push(req.body.perf.imagePerf);
// 			req.flash('success', 'Perf updated');
// 			res.redirect('/en/performances');
// 		}
// 	});
// });

//////////////////DELETE///////////////////////////////////
router.delete('/performances/:id', isLoggedIn, function(req, res) {
	Perf.findByIdAndDelete(req.params.id, function(err, perf) {
		if (err) {
			console.log(err);
		} else {
			req.flash('success', 'perf supprimée');
			res.redirect('/en/performances');
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
			res.render('videos/videosEN.ejs', { videos: videofound });
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
