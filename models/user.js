var mongoose = require('mongoose');
import es6Promise from 'es6-promise';
mongoose.Promise = es6Promise.Promise;

import Default from './util/default';

var UserSchema = mongoose.Schema({
	//REVISE add profile pic and cover pic
	firstName: {
		type: String,
		trim: true,
		sparse: true, //REVISE DELETE
		index: true
	},
	lastName: {
		type: String,
		trim: true,
		sparse: true, //REVISE DELETE
		index: true
	},
	fullName: {
		type: String,
		index: true
	},
	username: {
		type: String,
		index: true,
		unique: true,
		trim: true
	},
	password: {
		type: String
	},
	profileImg: {
		type: String,
		"default": Default.profileImg
	},
	coverImg: {
		type: String,
		"default": Default.coverImg
	},
	largeProfileImg: {
		type: String,
		"default": Default.largeProfileImg
	},
	largeCoverImg: {
		type: String,
		"default": Default.largeCoverImg
	},
	usersBeingFollowed: [mongoose.Schema.Types.ObjectId],
	usersFollowing: [mongoose.Schema.Types.ObjectId],
	notifications: {type: Array, "default": []}
}, 	{timestamps: true});

var User = module.exports = mongoose.model('User', UserSchema);

