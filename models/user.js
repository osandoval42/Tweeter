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

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.createUserWithPromise = (newUser) => {
	const promise = new es6Promise.Promise((resolve, reject) => {
		User.createUser(newUser, (err, user) => {
			if (err){throw err;}
			else{resolve(user);}
		})
	})
	return promise;
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query).then(callback)
     .catch(err => {
       callback(null, err)
     });;
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}

const getFollowing = (userID, callback, type) => {
	const id = mongoose.Types.ObjectId(userID);
	User.findById(id, (err, userOfInterest) => {
		if (err){
			return callback(err);
		} 
		const followingIDs = userOfInterest[type];
		User.find({
			'_id': { $in: followingIDs}
		}).select('username').exec(callback);
	})
}

module.exports.usersBeingFollowed = function(userID, callback){
	getFollowing(userID, callback, "usersBeingFollowed");
}


module.exports.usersFollowing = function(userID, callback){
	getFollowing(userID, callback, "usersFollowing");
}

const follow = (followerID, toFollowId, cb) => { 
	User.update(
		{ _id: toFollowId},
		{$push: {usersFollowing: followerID}},
		function(err){
			if (err){
				cb(true);
			} else {
				User.findByIdAndUpdate(
					followerID,
					{$push: {usersBeingFollowed: toFollowId}},
					{safe: true, new: true, fields: {username: 1, usersBeingFollowed: 1, usersFollowing: 1}},
					function(err, model){
						if (err){
							cb(true);
						} else {
							cb(null, model);
						}
					}
				)
			}
		}
	)
}

const unfollow = (unfollowerId, toUnfollowId, cb) => { 
	User.update(
		{ _id: toUnfollowId},
		{$pull: {usersFollowing: unfollowerId}}, 
		function(err){
			if (err){
				return	cb(true);
			} else {
				User.findByIdAndUpdate(
					unfollowerId,
					{$pull: {usersBeingFollowed: toUnfollowId}},
					{safe: true, new: true, fields: {username: 1}},
					function(err, model){
						if (err){
							cb(true);
						} else {
							cb(null, model)
						}
					}
				)
			}
		})
}

module.exports.toggleFollow = function(currUserId, otherUserId, cb){
	User.findById(currUserId, (err, currUser) => {
		if (err){
			return callback(err);
		} 

		const followingIDs = currUser["usersBeingFollowed"];
		if (followingIDs.some((id) => {
			return (otherUserId.equals(id));
		})) {
			unfollow(currUserId, otherUserId, cb)
		} else {
			follow(currUserId, otherUserId, cb)
		}
	})
}

module.exports.usersMatchingSubstr = (substr, cb) => {
	User.find({'username': {$regex: substr, $options: 'i'}}, null, {limit: 10}, cb)
}

// module.exports.saveProfilePic = function(userID, callback){

// }

// module.exports.saveCoverPic = function(userID, callback){

// }