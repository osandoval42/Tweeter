import express from 'express';
import passport from 'passport';
import User from '../../models/user';

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
}

module.exports = configFollowerRoutes;