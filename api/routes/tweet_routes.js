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
			Tweet.replyTweet(content, currUserId, original, (err, updatedOriginalTweet) => {
				if (err) { 
					return res.status(401).send({"ok": false}); 
				}
				else { 
					res.send(updatedOriginalTweet);
				}
			})
		}
	}),
	router.post('/retweet', (req, res) => {
		const currUser = req.user;
		if (RouteHelpers.ensureLoggedIn(currUser, res)){
			const currUserId = currUser['_id'];
			const originalTweetId = mongoose.Types.ObjectId(req.body.originalTweetId);
			Tweet.retweet(currUserId, originalTweetId, (err, originalTweetAfterRetweet) => {
				if (err) { 
					return res.status(401).send({"ok": false}); 
				}
				else { 
					res.send(originalTweetAfterRetweet);
				}
			})
		}
	}),
	router.delete('/retweet', (req, res) => {
		const currUser = req.user;
		if (RouteHelpers.ensureLoggedIn(currUser, res)){
			const currUserId = currUser['_id'];
			const retweetIdStr = req.body.retweetId
			const retweetId = mongoose.Types.ObjectId(retweetIdStr);
			Tweet.unretweet(currUserId, retweetId, (err, originalTweetAfterUnretweet) => {
				if (err) { 
					return res.status(401).send({"ok": false}); 
				}
				else { 
					res.send(originalTweetAfterUnretweet);
				}
			})
		}
	})
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
		// const reqTime = new Date().getTime()
		// console.log(`feed req time is ${reqTime}`);
		const currUser = req.user;
		const lastDownloadedTweetIdStr = req.query.lastId;
		const lastDownloadedTweetId = lastDownloadedTweetIdStr ? mongoose.Types.ObjectId(lastDownloadedTweetIdStr) : undefined;
		Tweet.feedTweets(currUser, lastDownloadedTweetId, (err, tweets) => {
				if (err) { 
					return res.status(401).send({"ok": false}); 
				}
				else { 
					let tweetsObj = {tweets, areAdditionalTweets: lastDownloadedTweetId ? true : false};
					// const resTime = new Date().getTime();
					// console.log(`feed res time is ${resTime}`);
					res.send(tweetsObj);
				}
		})
	}),
	router.get('/replies', (req, res) => {
		const lastDownloadedTweetIdStr = req.query.lastId;
		const lastDownloadedTweetId = lastDownloadedTweetIdStr ? mongoose.Types.ObjectId(lastDownloadedTweetIdStr) : undefined;
		const tweetIdStr = req.query.replyId;
		const tweetId = mongoose.Types.ObjectId(tweetIdStr);
		Tweet.tweetReplies(tweetId, lastDownloadedTweetId, (err, tweets) => {
				if (err) { 
					return res.status(401).send({"ok": false}); 
				}
				else { 
					let tweetsObj = {tweets, areAdditionalTweets: lastDownloadedTweetId ? true : false};
					res.send(tweetsObj);
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
					let tweetsObj = {tweets, areAdditionalTweets: lastDownloadedTweetId ? true : false};
					res.send(tweetsObj);
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
					let tweetsObj = {tweets, areAdditionalTweets: lastDownloadedTweetId ? true : false};
					res.send(tweetsObj);
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
					let tweetsObj = {tweets, areAdditionalTweets: lastDownloadedTweetId ? true : false};
					res.send(tweetsObj);
				}
		})
	}),
	router.get('/tweet', (req, res) => {
		const tweetIdStr = req.query.tweetId;
		if (tweetIdStr){
			const tweetId = mongoose.Types.ObjectId(tweetIdStr);
			Tweet.getTweetByIdWithAllInfo(tweetId, (err, tweet) => {
				if (err){
					return res.status(401).send({"ok": false}); 
				} else {
					res.send(tweet);
				}
			})
		} else {
			return res.status(401).send({"ok": false}); 
		}
	}),
	router.post('/get_like_pictures', (req, res) => {
		const likes = req.body.likes;
		if (likes){
			const likeIds = likes.map((like) => {
			return (mongoose.Types.ObjectId(like['userId']));
			})
			User.getAllPics(likeIds, (err, userImgObjs) => {
			if (err) { 
				return res.status(401).send({"ok": false}); 
			}
			else { 
				res.send(userImgObjs);
			}
			})
		} else {
			res.send([])
		}
	})
}

module.exports = configTweetRoutes;