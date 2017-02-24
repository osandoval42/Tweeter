var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
import es6Promise from 'es6-promise';
import User from './user';
import Like from './like/like_schema_only';
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
	tweetedAt: [mongoose.Schema.Types.ObjectId],
	likeCount: {
		type: Number
	}
}, {timestamps: true})

const Tweet = module.exports = mongoose.model('Tweet', TweetSchema);

module.exports.getTweetById = function(id, callback){
	Tweet.findById(id, callback);
}

module.exports.getTweetByIdWithAllInfo = (id, cb) => {
	Tweet.findById(id, (err, tweet) => {
		if (err) {return cb(true);}
		const jsonTweet = tweet.toObject();
		getTweetRepliedToAndNext(jsonTweet, undefined, cb);
	});
}

const verifyTweetedAtOriginalAuthor = (tweetedAtIds, originalTweet, cb) => {
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


// REVISE to send back actual tweet
module.exports.retweet = (currUserId, original, cb) => { //REVISE disallow self retweet
	const originalTweetId = mongoose.Types.ObjectId(original['_id']);
	Tweet.getTweetById(originalTweetId, (err, tweet) => {
		if (err) {cb(true);}

		if (tweet){
			const retweet = new Tweet({
				authorId: currUserId,
				originalTweetId: originalTweetId
			})
			retweet.save((err, _) => {
				if (err) {cb(true);}

				Tweet.getTweetByIdWithAllInfo(originalTweetId, cb);
			}); //Revise to send up content of original with retweet
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
			Tweet.remove({$or: [{replyToId: deletedId}, {originalTweetId: deletedId}]}, (err) => {
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
			const jsonTweets = tweets.map((tweet) => {return tweet.toObject();});
			async.eachSeries(jsonTweets, (tweet, next) => {
				getTweetRepliedToAndNext(tweet, next, undefined);
			}, (err) => {
				cb(err, jsonTweets);
			})
	})
}

module.exports.tweetReplies = (tweetId, lastDownloadedReplyId, cb) => {
	const query = lastDownloadedReplyId ? {_id: {$lt: lastDownloadedReplyId}} : {};
	query.replyToId = tweetId;
	getFeedTweets(query, cb);
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
		verifyTweetedAtOriginalAuthor(tweetedAtIds, original, (didTweetAt) => {
			console.log(`did reply is ${didTweetAt}`);
			const newPost = new Tweet({
				content,
				authorId: currUserId,
				tweetedAt: tweetedAtIds,
				replyToId: didTweetAt ? mongoose.Types.ObjectId(original['_id']) : undefined
			})
			newPost.save(cb);
		})
	})
}



//EVERYTHING BELOW IS FACILITATES TWEET RENDERING
const getAuthorNameAndNext = (tweet, next, finalCB, tweetToReturn) => {
			User.getUserById(tweet.authorId, (err, user) => {
				if (err) {throw err;} //REVISE
				tweet.authorName = user.username;
				determineIfRetweet(tweet, next, finalCB, tweetToReturn)
			})
}

const getTweetRepliedToAndNext = (tweet, next, finalCB) => {
	if (tweet.replyToId){
		Tweet.findById(tweet.replyToId, (err, tweetRepliedTo) => {
			if (err) {throw err;} //REVISE

			User.getUserById(tweetRepliedTo.authorId, (err, user) => {
				if (err) {throw err;} //REVISE

				tweet.tweetRepliedTo = {
					_id: tweetRepliedTo['id'],
					content: tweetRepliedTo.content,
					authorName: user.username
				};
				getAuthorNameAndNext(tweet, next, finalCB);
			})
		})
	} else {
		getAuthorNameAndNext(tweet, next, finalCB);
	}
}

const determineIfRetweet = (tweet, next, finalCB, tweetToReturn) => {
	const originalId = tweet.originalTweetId;
	if (originalId){
		Tweet.getTweetById(originalId, (err, originalTweet) => {
			if (err) {throw err;} //REVISE
			const jsonOriginalTweet = originalTweet.toObject();
			tweet.originalTweet = jsonOriginalTweet;
			getAuthorNameAndNext(jsonOriginalTweet, next, finalCB, tweetToReturn);
		})
	} else {
		getLikesAndNext(tweet, next, finalCB, tweetToReturn);
	}
}

const getLikesAndNext = (tweetToGetLikesFor, next, finalCB, tweetToReturn) => {
	Like.find({tweetId: tweetToGetLikesFor['_id']}, (err, likes) => {
		if (err) {throw err;} //REVISE
		tweetToGetLikesFor.likes = likes;
		getRetweetsAndNext(tweetToGetLikesFor, next, finalCB, tweetToReturn);
	})
}

const getRetweetsAndNext = (tweetToGetRetweetsFor, next, finalCB, tweetToReturn) => {
	Tweet.find({originalTweetId: tweetToGetRetweetsFor['_id']}, (err, retweets) => {
		if (err) {throw err;} //REVISE
		tweetToGetRetweetsFor.retweets = retweets;
		getReplyCountAndComplete(tweetToGetRetweetsFor, next, finalCB, tweetToReturn);
	})
}

const getReplyCountAndComplete = (tweetToGetReplyCountFor, next, finalCB, tweetToReturn) => {
	Tweet.count({replyToId: tweetToGetReplyCountFor['_id']}, (err, count) => {
		if (err) {throw err;}

		tweetToGetReplyCountFor.replyCount = count;

		if (next){
			next()
		} else {
			tweetToReturn ? finalCB(null, tweetToReturn) : finalCB(null, tweetToGetReplyCountFor);
		}		
	})
}