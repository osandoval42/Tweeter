import express from 'express';
import passport from 'passport';
import User from '../../models/user';
import Like from '../../models/like/like_complete';
import RouteHelpers from '../util/route_helpers';
var mongoose = require('mongoose');

const configFollowerRoutes = (router) => {
	router.post('/like', (req, res) => { //REVISE protect CSRF
		const currUser = req.user; 
		if (RouteHelpers.ensureLoggedIn(currUser)){
			const currUserId = currUser['_id']; 
			const strTweetId = req.body.tweetId;
			const tweetId = mongoose.Types.ObjectId(strTweetId);
			Like.toggleLike(currUserId, tweetId, (err, result) => {
				if (err) { 
					return res.status(401).send({"ok": false}); 
				}
				else { 
					res.send(result);
				}
			});
		}
	})
}

module.exports = configFollowerRoutes;