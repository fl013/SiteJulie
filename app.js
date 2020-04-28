const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	cookieParser = require('cookie-parser'),
	passportLocalMongoose = require('passport-local-mongoose'),
	flash = require('connect-flash'),
	User = require('./models/User'),
	Photo = require('./models/photo'),
	Video = require('./models/video'),
	session = require('express-session'),
	methodOverride = require('method-override'),
	frenchRoutes = require('./routes/fr'),
	englishRoutes = require('./routes/en'),
	cookie = require('cookie');

// response.cookie('same-site-cookie', 'foo', { sameSite: 'lax' });
// response.cookie('cross-site-cookie', 'bar', { sameSite: 'none', secure: true });
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
mongoose.Promise = global.Promise;

// const databaseUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';

const databaseUrl = 'mongodb+srv://florian:IIjj206.@cluster0-tcar2.mongodb.net/test?retryWrites=true&w=majority';
console.log(databaseUrl);
mongoose
	.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log(`Database connected`))
	.catch((err) => console.log(`Database connection error: ${err.message}`));

app.use(
	require('express-session')({
		secret: 'Once again Rusty wins cutest dog!',
		resave: false,
		saveUninitialized: false
	})
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(
	new LocalStrategy(function(username, password, done) {
		User.findOne({ username: username }, function(err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
				console.log('incorrect username');
			}
			if (user.password != password) {
				return done(null, false, { message: 'Incorrect password.' });
				console.log('incorrect password');
			}
			return done(null, user);
		});
	})
);
// app.use(function(req, res, next) {
// 	res.locals.currentUser = req.user;
// 	res.locals.success = req.flash('success');
// 	res.locals.error = req.flash('error');
// 	next();
// });

// Photo.create(
// 	{
// 		title: 'photoTest',
// 		url: 'https://i.ibb.co/R08d88w/FAUX-Q-TAROT-210220180524-copie.jpg',
// 		alt: 'test',
// 		text: 'plouf',
// 		utilite: 'homePage'
// 	},
// 	function(err, photo) {
// 		if (err) {
// 			console.log(err);
// 		}
// 		{
// 			console.log(photo);
// 		}
// 	}
// );

app.get('/', function(req, res) {
	res.render('landing');
});

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

app.get('/login', function(req, res) {
	res.render('login');
});

app.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: 'en/home',
		failureRedirect: '/login',
		successFlash: 'Log in correctly',
		failureFlash: 'pas bon'
	}),
	function(req, res) {}
);

app.get('/logout', function(req, res) {
	req.logout();
	req.flash('success', 'Log out successful');
	res.redirect('/en/home');
});

app.use('/fr', frenchRoutes);
app.use('/en', englishRoutes);

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log('Server Has Started!');
});
