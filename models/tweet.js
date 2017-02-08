var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
import es6Promise from 'es6-promise';
import User from './user';
mongoose.Promise = es6Promise.Promise;

const parseAtSymbols = (content, saveTweet) => {
	let namesTweetedAt = content.split('@');
	console.log(`names tweeted at are ${namesTweetedAt}`);
	let idsTweetedAt = [];

	if (namesTweetedAt.length === 0){
		saveTweet(idsTweetedAt);
	} else {
		namesTweetedAt.forEach((stringWithName, i) => {
			if (i === 0){
				return;
			}
			let idxAfterName = stringWithName.indexOf(" ");
			let username = (idxAfterName === -1) ? stringWithName : stringWithName.slice(0, idxAfterName);
			if (i === (namesTweetedAt.length - 1)){
				User.getUserByUsername(username, function(user){
					if (user !== null){
						const userId = user['_id'];
						idsTweetedAt.push(userId);
					}
					saveTweet(idsTweetedAt);
				})
			} else {
				User.getUserByUsername(username, function(user){
					if (user !== null){
						const userId = user['_id'];
						idsTweetedAt.push(userId);
					}
				})
			}
			// console.log(`i is ${i} out of ${namesTweetedAt.length - 1}`);
			// console.log(`current idsTweetedAt are ${idsTweetedAt}`);
		})
	}
}

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

//REVISE test for empty string content
module.exports.postTweet = (content, currUserId, cb) => {
	//REVISE parse content for @s to determine ids
	parseAtSymbols(content, (tweetedAtIds) => {
		const newPost = new Tweet({
			content,
			authorId: currUserId,
			tweetedAt: tweetedAtIds
		})
		newPost.save(cb);
	});
}