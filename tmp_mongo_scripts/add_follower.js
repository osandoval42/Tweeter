import User from '../models/user';
import config from '../config';
var mongoose = require('mongoose');
import es6Promise from 'es6-promise';
mongoose.Promise = es6Promise.Promise;

const db = config.configDB();

const user1Id = mongoose.Types.ObjectId("589992add19b9a435d067a1b");
const user2Id = mongoose.Types.ObjectId("589991231295f3431017a764");

User.findByIdAndUpdate(
	user1Id,
	{$push: {usersBeingFollowed: user2Id}},
	{safe: true, new: true},
	function(err, model){
		if (err){
			console.log(`err is ${err}`);
		} else {
			console.log(`new model is ${model}`);
		}
	}
)

User.findByIdAndUpdate(
	user2Id,
	{$push: {usersFollowing: user1Id}},
	{safe: true, new: true},
	function(err, model){
		if (err){
			console.log(`err is ${err}`);
		} else {
			console.log(`new model is ${model}`);
		}
	}
)