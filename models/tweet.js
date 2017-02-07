var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
import es6Promise from 'es6-promise';
mongoose.Promise = es6Promise.Promise;

const TweetSchema = mongoose.Schema({ //REVISE img data
	retweetId: {
		type: mongoose.Schema.Types.ObjectId,
		index: true
	},
	content: {
		type: String,
		trim: true
	},
	authorId: {
		type: mongoose.Schema.Types.ObjectId,
		index: true
	},
	replyToId: {
		type: mongoose.Schema.Types.ObjectId,
		index: true
	},
	tweetedAt: [mongoose.Schema.Types.ObjectId],
	likeCount: {
		type: Number
	}
}, {timestamps: true})

const Tweet = module.exports = mongoose.model('Tweet', TweetSchema);