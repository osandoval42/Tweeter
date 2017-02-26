var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
import es6Promise from 'es6-promise';
mongoose.Promise = es6Promise.Promise;

var UserSchema = mongoose.Schema({
	//REVISE add profile pic and cover pic
	firstName: {
		type: String,
		trim: true,
		sparse: true //REVISE DELETE
	},
	lastName: {
		type: String,
		trim: true,
		sparse: true //REVISE DELETE
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
	email: {
		type: String,
		unique: true,
		trim: true,
		index: true,
		sparse: true //REVISE DELETE
	},
	usersBeingFollowed: [mongoose.Schema.Types.ObjectId],
	usersFollowing: [mongoose.Schema.Types.ObjectId]
}, 	{timestamps: true});

var User = module.exports = mongoose.model('User', UserSchema);

