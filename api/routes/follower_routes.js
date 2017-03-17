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
		if (RouteHelpers.ensureLoggedIn(currUser, res)){
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
	//1) put all users in hash
	//2) eliminate all beingFollowed while simultaneously building hash of beingFollowed
	//3) Move through each user remaining in hash, going through followedBy arr
		//if we find someone in followedBy also in our beingFollowed hash{
		// append userObject onto oneDegreeOfSeparation 
		// write userObject.followerWhoWeFile =
		//} else {
		// append userObject onto randomFollowers
		//}
	//4) Shuffle both arrays
	//5) Concatenate arrays


	//on follow user is removed from who to follow and comp re renders
	//on refresh state is set to currIdx + 3
	router.get('/who_to_follow', (req, res) => {
		const currUser = req.user;
		if (RouteHelpers.ensureLoggedIn(currUser, res)){
			User.whoToFollow(currUser, (err, whoToFollow) => {
				if (err){return res.status(401).send({"ok": false});}

				res.send(whoToFollow);
			})
		}
	})
}

module.exports = configFollowerRoutes;