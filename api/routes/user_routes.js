import express from 'express';
import User from '../../models/user';
import RouteHelpers from '../util/route_helpers';
var mongoose = require('mongoose');


const configUserRoutes = (router) => { //REVISE disallow blank string
	router.get('/search_users', (req, res) => {
		const substr = req.query.substr
		if (substr && substr !== ""){
			User.usersMatchingSubstr(substr, (err, users) => {
				if (err) {return res.status(401).send({"ok": false})}; 
				res.send(users)
			})
		} else {
			res.status(401).send({"ok": false}); 
		}
	})
}

module.exports = configUserRoutes;