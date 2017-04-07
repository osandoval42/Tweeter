var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
import es6Promise from 'es6-promise';
mongoose.Promise = es6Promise.Promise;


const TweetSchema = mongoose.Schema({ //REVISE img data
	originalTweetId: {
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
	tweetedAt: {type: Array, "default": [], index: true},
	hashtags: {type: Array, "default": [], index: true},
	likeCount: {
		type: Number
	}
}, {timestamps: true})


//place index at hashtags
const Tweet = module.exports = mongoose.model('Tweet', TweetSchema);





