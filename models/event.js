const mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
	dateDebut: Date,
	dateFin: Date,
	title: String,
	url: String,
	text: String,
	lieu: String,
	ville: String,
	section: String
});

module.exports = mongoose.model('Event', eventSchema);
