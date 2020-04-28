const User = require('../models/User');

module.exports = {
	isLoggedIn: function(req, res, next) {
		if (req.isAuthenticated()) {
			next();
		}
		{
		}
	}
};
