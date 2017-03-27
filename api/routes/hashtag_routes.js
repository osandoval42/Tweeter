import express from 'express';
import passport from 'passport';
import {Hashtag} from '../../models/models';
import RouteHelpers from '../util/route_helpers';
var mongoose = require('mongoose');

const configHashtagRoutes = (router) => {
	router.get('/trending', (req, res) => { //REVISE protect CSRF
		Hashtag.trending((err, trendingHashtags) => {
			if (err) { 
				return res.status(401).send({"ok": false}); 
			}
			else { 
				res.send(trendingHashtags);
			}
		})
	})
}

module.exports = configHashtagRoutes;