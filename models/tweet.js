var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
import es6Promise from 'es6-promise';
import User from './user';
mongoose.Promise = es6Promise.Promise;
import async from 'async';


const parseAtSymbols = (content, cb) => {
	let namesTweetedAt = content.split('@');
	let idsTweetedAt = [];
	async.eachSeries(namesTweetedAt, (stringWithName, next) => {
		let idxAfterName = stringWithName.indexOf(" ");
		let username = (idxAfterName === -1) ? stringWithName : stringWithName.slice(0, idxAfterName);
		User.getUserByUsername(username, function(user, err){
			if (err) console.error(`err is ${err}`)
			if (user !== null){
				console.log(`user is ${user}`);
				const userId = user['_id'];
				idsTweetedAt.push(userId);
			}
			next()
		})
	}, (err) => {
		cb(idsTweetedAt);
	})
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

module.exports.getTweetById = function(id, callback){
	Tweet.findById(id, callback);
}

const verifyRepliedToAuthor = (tweetedAtIds, originalTweet, cb) => {
	const originalAuthorId = mongoose.Types.ObjectId(originalTweet.authorId);
	cb(tweetedAtIds.some((tweetedAtId) => {return tweetedAtId['_id'] === originalAuthorId['_id']}));
}

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



module.exports.retweet = (currUserId, original, cb) => { //REVISE disallow self retweet
	const originalTweetId = mongoose.Types.ObjectId(original['_id']);
	Tweet.getTweetById(originalTweetId, (err, tweet) => {
		if (tweet){
			const retweet = new Tweet({
				authorId: currUserId,
				retweetId: originalTweetId
			})
			retweet.save(cb); //Revise to send up content of original with retweet
		} else {
			cb(true);
		}
	})
}

module.exports.delete = (currUserId, tweetId, cb) => { 
	Tweet.findOneAndRemove({_id: tweetId, authorId: currUserId}, (err, deletedTweet) => {
		if (err || !deletedTweet){
			cb(true);
		} else {
			const deletedId = deletedTweet['_id'];
			Tweet.remove({$or: [{replyToId: deletedId}, {retweetId: deletedId}]}, (err) => {
				if (err) {console.err(`delete retweets and replies err is ${err}`);}
			})
			cb(undefined, deletedTweet);
		}
	})
}

const getFeedTweets = (query, cb) => {
	Tweet.find(query ,null, 
		{limit: 10, sort: { _id: -1}}, 
		(err, tweets) => {
			cb(err, tweets);
	})
}

module.exports.feedTweets = (currUserId, lastDownloadedTweetId, cb) => {
	const query = lastDownloadedTweetId ? {_id: {$lt: lastDownloadedTweetId}} : {};
	if (currUserId){
		User.usersBeingFollowed(currUserId, (err, usersBeingFollowed) => {
			if (err){return cb(err);}

			const beingFollowedIds = usersBeingFollowed.map((user) => {return user['_id'];});
			query.authorId = {$in: beingFollowedIds};
			getFeedTweets(query, cb);
		})
	} else {
		getFeedTweets(query, cb);
	}
}

module.exports.userTweets = (userId, lastDownloadedTweetId, cb) => {
	const query = lastDownloadedTweetId ? {_id: {$lt: lastDownloadedTweetId}} : {};
	query.authorId = userId;
	getFeedTweets(query, cb);
}

module.exports.replyTweet = (content, currUserId, original, cb) => { //REVISE disallow self reply
	parseAtSymbols(content, (tweetedAtIds) => {
		verifyRepliedToAuthor(tweetedAtIds, original, (didReply) => {
			console.log(`did reply is ${didReply}`);
			const newPost = new Tweet({
				content,
				authorId: currUserId,
				tweetedAt: tweetedAtIds,
				replyToId: didReply ? mongoose.Types.ObjectId(original['_id']) : undefined
			})
			newPost.save(cb);
		})
	})
}