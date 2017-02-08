import express from 'express';
import passport from 'passport';
import Tweet from '../../models/tweet';
import RouteHelpers from '../util/route_helpers';
var mongoose = require('mongoose');



const configTweetRoutes = (router) => {
	router.post('/tweet', (req, res) => {
		const content = req.body.content;
		// const currUser = req.user;
		// if (RouteHelpers.ensureLoggedIn(currUser, res)){
			// const currUserId = currUser['_id'];
			const currUserId = mongoose.Types.ObjectId(req.body.posterId); //Revise Delete and uncommment rest
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
}

module.exports = configTweetRoutes;