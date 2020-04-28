const mongoose = require('mongoose');

var videoSchema = new mongoose.Schema({
	title: String,
	url: String,
	alt: String,
	text: String
});

module.exports = mongoose.model('Videos', videoSchema);
