import express from 'express';
import {User, Like, Tweet} from '../../models/models';
import RouteHelpers from '../util/route_helpers';
var mongoose = require('mongoose');


const configUserRoutes = (router) => { //REVISE disallow blank string
	router.get('/search_users', (req, res) => {
		const substr = req.query.substr;
		if (substr && substr !== ""){
			User.usersMatchingSubstr(substr, (err, users) => {
				if (err) {return res.status(401).send({"ok": false})}; 
				res.send(users)
			})
		} else {
			res.status(401).send({"ok": false}); 
		}
	}),
	router.get('/profile_user', (req, res) => {
		const username = req.query.username;
		User.getUserForProfileByUsername(username, (err, user) => {
			if (err) {return res.status(401).send({"ok": false})}; 
			if (!user) {return res.status(401).send({"ok": false, err: "user doesn't exist"})};
			res.send(user);
		})
	})
}

/*
username
full name
created
tweet count
following count
followers count
likes count
*/

module.exports = configUserRoutes;