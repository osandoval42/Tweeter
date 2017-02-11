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

module.exports.toggleLike = (userId, tweetId, cb) => { //REVISE confirm not retweet
	Like.findOneAndRemove({userId, tweetId}, (err, deletedLike) => {
		if (err) {return cb(true);}

		if (deletedLike){
			const result = {
				tweetId: tweetId,
				result: Constants.SUCCESSFUL_UNLIKE
			}
			cb(err, result);
		} else {
			const newLike = new Like({
				userId,
				tweetId
			})
			newLike.save((err, like) => {
				if (err) {return cb(true);}

				const result = {
					tweetId: tweetId,
					result: Constants.SUCCESSFUL_LIKE
				}
				cb(err, result);
			})
		}
	})
}