import express from 'express';
import passport from 'passport';
import {User, Like, Tweet} from '../../models/models';
import RouteHelpers from '../util/route_helpers';
var mongoose = require('mongoose');

const configFollowerRoutes = (router) => {
	router.get('/:userId/following', (req, res) => {
		User.usersBeingFollowed(req.params.userId, (err, usersFollowing) => {
			if (err) { 
				return res.status(401).send({"ok": false}); 
			}
			else { 
				res.send(usersFollowing)
			}
		})
	})
	router.get('/:userId/followers', (req, res) => {
		User.usersFollowing(req.params.userId, (err, followers) => {
			if (err) { 
				return res.status(401).send({"ok": false}); 
			}
			else { 
				res.send(followers)
			}
		})
	})
	router.post('/follow', (req, res) => { //REVISE protect CSRF
		const currUser = req.user;
		if (RouteHelpers.ensureLoggedIn(currUser)){
			const currUserId = currUser['_id'];
			const strUserId = req.body.toFollowId;
			const toFollowId = mongoose.Types.ObjectId(strUserId);
			User.toggleFollow(currUserId, toFollowId, (err, updatedCurrUser) => {
				if (err) { 
					return res.status(401).send({"ok": false}); 
				}
				else { 
					res.send(updatedCurrUser);
				}
			});
		}
	})
}

module.exports = configFollowerRoutes;