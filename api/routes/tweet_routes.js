import express from 'express';
import passport from 'passport';
import Tweet from '../../models/tweet';
import RouteHelpers from '../util/route_helpers';
var mongoose = require('mongoose');



const configTweetRoutes = (router) => {
	router.post('/tweet', (req, res) => {
		// const currUser = req.user;
		// if (RouteHelpers.ensureLoggedIn(currUser, res)){
			// const currUserId = currUser['_id'];
			const currUserId = mongoose.Types.ObjectId(req.body.posterId); //Revise Delete and uncommment rest
			const content = req.body.content;
			Tweet.postTweet(content, currUserId, (err, newPost) => {
				if (err) { 
					return res.status(401).send({"ok": false}); 
				}
				else { 
					res.send(newPost);
				}
			})
		// }
	})
	router.post('/tweet_reply', (req, res) => {
		// const currUser = req.user;
		// if (RouteHelpers.ensureLoggedIn(currUser, res)){
			// const currUserId = currUser['_id'];
			const currUserId = mongoose.Types.ObjectId(req.body.posterId); //Revise Delete and uncommment rest
			const content = req.body.content;
			const original = req.body.original;
			Tweet.replyTweet(content, currUserId, original, (err, newReply) => {
				if (err) { 
					return res.status(401).send({"ok": false}); 
				}
				else { 
					res.send(newReply);
				}
			})
		// }
	}),
	router.post('/retweet', (req, res) => {
		// const currUser = req.user;
		// if (RouteHelpers.ensureLoggedIn(currUser, res)){
			// const currUserId = currUser['_id'];
			const currUserId = mongoose.Types.ObjectId(req.body.posterId); //Revise Delete and uncommment rest
			const original = req.body.original;
			Tweet.retweet(currUserId, original, (err, originalTweetAfterRetweet) => {
				if (err) { 
					return res.status(401).send({"ok": false}); 
				}
				else { 
					res.send(originalTweetAfterRetweet);
				}
			})
		// }
	}),
	router.delete('/tweet', (req, res) => {
		// const currUser = req.user;
		// if (RouteHelpers.ensureLoggedIn(currUser, res)){
			// const currUserId = currUser['_id'];
			const currUserId = mongoose.Types.ObjectId(req.body.posterId); //Revise Delete and uncommment rest
			const tweetId = mongoose.Types.ObjectId(req.body.tweetId);
			Tweet.delete(currUserId, tweetId, (err, deletedTweet) => {
				if (err) { 
					return res.status(401).send({"ok": false}); 
				}
				else { 
					res.send(deletedTweet);
				}
			})
		// }
	}),
	router.get('/feed_tweets', (req, res) => {
		// const currUserIdStr = req.user;
		const currUserIdStr = req.query.currUserId;//REVISE DELETE AND UNCOMMENT REST
		const currUserId = currUserIdStr ? mongoose.Types.ObjectId(currUserIdStr) : undefined;
		const lastDownloadedTweetIdStr = req.query.lastId;
		const lastDownloadedTweetId = lastDownloadedTweetIdStr ? mongoose.Types.ObjectId(lastDownloadedTweetIdStr) : undefined;
		Tweet.feedTweets(currUserId, lastDownloadedTweetId, (err, tweets) => {
				if (err) { 
					return res.status(401).send({"ok": false}); 
				}
				else { 
					res.send(tweets);
				}
		})
	}),
	router.get('/user_tweets', (req, res) => {
		const userIdStr = req.query.user;
		const userId = userIdStr ? mongoose.Types.ObjectId(userIdStr) : undefined;
		const lastDownloadedTweetIdStr = req.query.lastId;
		const lastDownloadedTweetId = lastDownloadedTweetIdStr ? mongoose.Types.ObjectId(lastDownloadedTweetIdStr) : undefined;
		Tweet.userTweets(userId, lastDownloadedTweetId, (err, tweets) => {
				if (err) { 
					return res.status(401).send({"ok": false}); 
				}
				else { 
					res.send(tweets);
				}
		})
	}),
	router.get('/tweet_replies', (req, res) => {
		const tweetIdStr = req.query.tweetId;
		const tweetId = tweetIdStr ? mongoose.Types.ObjectId(tweetIdStr) : undefined;
		const lastDownloadedTweetIdStr = req.query.lastId;
		const lastDownloadedTweetId = lastDownloadedTweetIdStr ? mongoose.Types.ObjectId(lastDownloadedTweetIdStr) : undefined;
		Tweet.tweetReplies(tweetId, lastDownloadedTweetId, (err, replies) => {
				if (err) { 
					return res.status(401).send({"ok": false}); 
				}
				else { 
					res.send(replies);
				}
		})
	})
}

module.exports = configTweetRoutes;