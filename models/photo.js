const mongoose = require('mongoose');

var photoSchema = new mongoose.Schema({
	title: String,
	url: String,
	alt: String,
	text: String,
	section: String,
	utilite: String
});

module.exports = mongoose.model('Photo', photoSchema);
