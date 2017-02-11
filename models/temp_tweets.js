const getAuthorNameAndNext = (tweet, next, finalCB) => {
			User.getUserById(tweet.authorId, (err, user) => {
				if (err) {throw err;} //REVISE

				tweet['authorName'] = user.username;
				getTweetRepliedTo(tweet, next, finalCB)
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
				determineIfRetweet(tweet, next, finalCB);
			})
		})
	} else {
		determineIfRetweet(tweet, next, finalCB);
	}
}

const determineIfRetweet(tweet, next, finalCB){
	const originalId = tweet.retweetId;
	if (originalId){
		Tweet.getTweetById(originalId, (err, originalTweet) => {
			if (err) {throw err;} //REVISE

			getLikesAndNext(originalTweet, tweet, next, finalCB);
		})
	} else {
		getLikesAndNext(tweet, undefined, next, finalCB);
	}
}


const getLikesAndNext = (tweetToGetLikesFor, retweet, next, finalCB) => {
	Like.find({tweetId: tweetToGetLikesFor['_id']}, (err, likes) => {
		if (err) {throw err;} //REVISE

		if (retweet){
			retweet.likes = likes;
		} else {
			tweetToGetLikesFor.likes = likes;
		}
		getRetweetsAndComplete(tweetToGetLikesFor, retweet, next, finalCB);
	})
}

const getRetweetsAndComplete = (tweetToGetRetweetsFor, retweet, next, finalCB) => {
		Tweet.find({retweetId: tweetToGetRetweetsFor['_id']}, (err, retweets) => {
		if (err) {throw err;} //REVISE

		if (retweet){
			retweet.retweets = retweets;
		} else {
			tweetToGetRetweetsFor.retweets = retweets;
		}
		if (next){
			next()
		} else {
				retweet ? finalCB(null, retweet) : finalCB(null, tweetToGetRetweetsFor);
		}
	})
}


const getFeedTweets = (query, cb) => {
	Tweet.find(query ,null, 
		{limit: 10, sort: { _id: -1}}, 
		(err, tweets) => {
			const jsonTweets = tweets.map((tweet) => {return tweet.toObject();});
			async.eachSeries(jsonTweets, (tweet, next) => {
				getAuthorNameAndNext(tweet, next, undefined);
			}, (err) => {
				cb(err, jsonTweets);
			})
	})
}
