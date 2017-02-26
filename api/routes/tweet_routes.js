import express from 'express';
import passport from 'passport';
import {User, Like, Tweet} from '../../models/models';
import RouteHelpers from '../util/route_helpers';
var mongoose = require('mongoose');



const configTweetRoutes = (router) => {
	router.post('/tweet', (req, res) => {
		const currUser = req.user;
		if (RouteHelpers.ensureLoggedIn(currUser, res)){
			const currUserId = currUser['_id'];
			const content = req.body.content;
			Tweet.postTweet(content, currUserId, (err, newPost) => {
				if (err) { 
					return res.status(401).send({"ok": false}); 
				}
				else { 
					res.send(newPost);
				}
			})
		}
	})
	router.post('/tweet_reply', (req, res) => {
		const currUser = req.user;
		if (RouteHelpers.ensureLoggedIn(currUser, res)){
			const currUserId = currUser['_id'];
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
		}
	}),
	router.post('/retweet', (req, res) => {
		const currUser = req.user;
		if (RouteHelpers.ensureLoggedIn(currUser, res)){
			const currUserId = currUser['_id'];
			const original = req.body.original;
			Tweet.retweet(currUserId, original, (err, originalTweetAfterRetweet) => {
				if (err) { 
					return res.status(401).send({"ok": false}); 
				}
				else { 
					res.send(originalTweetAfterRetweet);
				}
			})
		}
	}),
	router.delete('/tweet', (req, res) => {
		const currUser = req.user;
		if (RouteHelpers.ensureLoggedIn(currUser, res)){
			const currUserId = currUser['_id'];
			const tweetId = mongoose.Types.ObjectId(req.body.tweetId);
			Tweet.delete(currUserId, tweetId, (err, deletedTweet) => {
				if (err) { 
					return res.status(401).send({"ok": false}); 
				}
				else { 
					res.send(deletedTweet);
				}
			})
		}
	}),
	router.get('/feed_tweets', (req, res) => {
		const currUser = req.user;
		const currUserId = currUser ? currUser['_id'] : undefined;
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
		const userIdStr = req.query.userId;
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
	router.get('/user_tweets_without_replies', (req, res) => {
		const userIdStr = req.query.userId;
		const userId = userIdStr ? mongoose.Types.ObjectId(userIdStr) : undefined;
		const lastDownloadedTweetIdStr = req.query.lastId;
		const lastDownloadedTweetId = lastDownloadedTweetIdStr ? mongoose.Types.ObjectId(lastDownloadedTweetIdStr) : undefined;
		Tweet.userTweetsWithoutReplies(userId, lastDownloadedTweetId, (err, tweets) => {
				if (err) { 
					return res.status(401).send({"ok": false}); 
				}
				else { 
					res.send(tweets);
				}
		})
	})
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
	}),
	router.get('/tweets_user_likes', (req, res) => {
		const userIdStr = req.query.userId;
		const userId = userIdStr ? mongoose.Types.ObjectId(userIdStr) : undefined;
		const lastDownloadedTweetIdStr = req.query.lastId;
		const lastDownloadedTweetId = lastDownloadedTweetIdStr ? mongoose.Types.ObjectId(lastDownloadedTweetIdStr) : undefined;
		Tweet.likedTweets(userId, lastDownloadedTweetId, (err, tweets) => {
				if (err) { 
					return res.status(401).send({"ok": false}); 
				}
				else { 
					res.send(tweets);
				}
		})
	})
}

module.exports = configTweetRoutes;