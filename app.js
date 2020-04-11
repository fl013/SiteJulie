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
	session = require('express-session'),
	methodOverride = require('method-override'),
	frenchRoutes = require('./routes/fr'),
	englishRoutes = require('./routes/en');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.Promise = global.Promise;

// const databaseUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';

const databaseUrl = 'mongodb+srv://florian:IIjj206.@cluster0-tcar2.mongodb.net/test?retryWrites=true&w=majority';
console.log(databaseUrl);
mongoose
	.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log(`Database connected`))
	.catch((err) => console.log(`Database connection error: ${err.message}`));

User.create({ username: 'julie', password: 'admin6057' }, function(err, admin) {
	if (err) {
		console.log(err);
	}
	{
		console.log(admin);
	}
});

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
console.log(passport);

app.get('/', function(req, res) {
	res.render('homeFR.ejs');
});

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

app.get('/login', function(req, res) {
	res.render('login');
});

app.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/en/news',
		failureRedirect: '/login'
	}),
	function(req, res) {}
);
app.use('/fr', frenchRoutes);
app.use('/en', englishRoutes);

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log('Server Has Started!');
});
