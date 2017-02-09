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
			debugger;
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
	})
}

module.exports = configTweetRoutes;