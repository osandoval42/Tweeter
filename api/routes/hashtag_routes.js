import express from 'express';
import passport from 'passport';
import {Hashtag, Tweet} from '../../models/models';
import RouteHelpers from '../util/route_helpers';
var mongoose = require('mongoose');

const configHashtagRoutes = (router) => {
	router.get('/trending', (req, res) => { //REVISE protect CSRF
		// const reqTime = new Date().getTime()
		// console.log(`hash req time is ${reqTime}`);
		Hashtag.trending((err, trendingHashtags) => {
			if (err) { 
				return res.status(401).send({"ok": false}); 
			}
			else { 
				// const resTime = new Date().getTime();
				// console.log(`hash res time is ${resTime}`);
				res.send(trendingHashtags);
			}
		})
	}),
	router.get('/hashtag_tweets', (req, res) => {
		const lastDownloadedTweetIdStr = req.query.lastId;
		const lastDownloadedTweetId = lastDownloadedTweetIdStr ? mongoose.Types.ObjectId(lastDownloadedTweetIdStr) : undefined;
		const hashtagName = req.query.hashtag
		Tweet.hashtagTweets(hashtagName, lastDownloadedTweetId, (err, tweets) => {
				if (err) { 
					return res.status(401).send({"ok": false}); 
				}
				else { 
					let tweetsObj = {tweets, areAdditionalTweets: lastDownloadedTweetId ? true : false};
					res.send(tweetsObj);
				}
		})
	})
}

module.exports = configHashtagRoutes;