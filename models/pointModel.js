var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pointModel = new Schema({
	coordinates: {
		x: {
			type: Number
		},
		y: {
			type: Number
		}
	},
	color: {
		type: String
	}
});

module.exports = mongoose.model('Point', pointModel);
