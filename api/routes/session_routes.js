import express from 'express';
import passport from 'passport';
import {User, Like, Tweet} from '../../models/models';

const Helpers = {
	checkForSessionStartErrs(req, res, isSignup = false){
		req.checkBody('user[username]', 'Name is required').notEmpty();
		req.checkBody('user[password]', 'password is required').notEmpty();
		const errors = req.validationErrors();
		if (isSignup === true){
			req.checkBody('user[confirmPassword]', 'confirm password').notEmpty();
			req.checkBody('user[confirmPassword]', 'Passwords do not match').equals(req.body.user.password);
		}
		if(errors){
			res.status(401).send({
				errors:errors
			});
			return true;
		}
		return false;
	}
};

const configSessionRoutes = (router) => {
	router.post('/login', function(req, res, next) {
		  if (Helpers.checkForSessionStartErrs(req, res) === false){
		  	  passport.authenticate('local', function(err, user, info) {
		        if (err)  { return next(err); }
		        if (!user) { return res.status(401).send({"ok": false}); }
		        req.logIn(user, function(err) {
		          if (err) { return res.status(401).send({"ok": false}); }
		     		Tweet.getTweetCount(user['_id'], (err, tweetCount) => {
		     			if (err) { return res.status(401).send({"ok": false}); }
		     			let userInJson = user.toObject();
		     			userInJson.tweetCount = tweetCount;
		     			userInJson.password = "";
		     			return res.send(userInJson);
		     		})
		        });
		  	  })(req, res, next);  
		  }  
	});

	router.post('/signup', (req, res) => {
			const user = req.body.user;
			const username = user.username;
			const password = user.password;
			const confirmedPassword = user.confirmPassword;

			const email = user.email;
			const firstName = user.firstName;
			const lastName = user.lastName;

			// const profilePic = user.profilePic;
			// const coverPic = user.coverPic;

			const following = [];
			const followedBy = [];

			if (Helpers.checkForSessionStartErrs(req, res, true) === false){
				//REVISE check for signupErrs
				const newUser = new User({
					username,
					firstName,
					lastName,
					password
					// email,
					// firstName,
					// lastName, 
					// profilePic,
					// coverPic,
					// following,
					// followedBy
				});

				User.createUser(newUser, function(err, user){
					if(err) throw err;
					// req.flash('success_msg', 'You are registered and can now login');
					req.logIn(user, function(err) {
			     	if (err) { return res.status(401).send({"ok": false}); }
			     		Tweet.getTweetCount(user['_id'], (err, tweetCount) => {
			     			if (err) { return res.status(401).send({"ok": false}); }
			     			let userInJson = user.toObject();
			     			userInJson.tweetCount = tweetCount;
			     			userInJson.password = "";
			     			return res.send(userInJson);
			     		})
			    	});
				});
			}
		});


	router.delete('/logout', function(req, res){
		req.logout();
		// req.flash('success_msg', 'You are logged out');
		res.status(200).send({ok: true});
	});
};

module.exports = configSessionRoutes;



