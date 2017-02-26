var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
import es6Promise from 'es6-promise';
import Constants from './model_constants';
mongoose.Promise = es6Promise.Promise;

const LikeSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		index: true
	},
	tweetId: {
		type: mongoose.Schema.Types.ObjectId,
		index: true
	}
}, 	{timestamps: true})

var Like = module.exports = mongoose.model('Like', LikeSchema);
