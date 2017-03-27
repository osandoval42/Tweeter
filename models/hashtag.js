var mongoose = require('mongoose');
import es6Promise from 'es6-promise';
mongoose.Promise = es6Promise.Promise;

var HashtagSchema = mongoose.Schema({
	//REVISE add profile pic and cover pic
	name: {
		type: String,
		index: true
	},
	trendCount: {
		type: Number
	}
}, 	{timestamps: true});

var Hashtag = module.exports = mongoose.model('Hashtag', HashtagSchema);

