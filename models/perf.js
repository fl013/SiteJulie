const mongoose = require('mongoose');

var perfSchema = new mongoose.Schema({
	titre: String,
	url: String,
	text: String,
	ficheUrl: String,
	imagePerf: [ String ]
});

module.exports = mongoose.model('Perf', perfSchema);
