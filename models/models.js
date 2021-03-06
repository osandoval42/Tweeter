import Tweet from './tweet';
import User from './user';
import Like from './like';
import Hashtag from './hashtag';
import async from 'async';
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
import es6Promise from 'es6-promise';
import sharp from 'sharp';
mongoose.Promise = es6Promise.Promise;

module.exports.Like = Like;
module.exports.Tweet = Tweet;
module.exports.User = User;
module.exports.Hashtag = Hashtag;

String.prototype.capitalize = function(){ //SKIP
	return this.charAt(0).toUpperCase() + (this.slice(1).split('').map((char)=>{return char.toLowerCase();}).join(""));
}

const verifyTweetedAtOriginalAuthor = (allTweetedAt, originalTweet, cb) => { //SKIP
	const originalAuthorId = originalTweet.authorId;
	cb(allTweetedAt.some((tweetedAt) => {return tweetedAt['userId'].toString() == originalAuthorId;}));
}

const parseAtSymbols = (content, cb) => { //SKIP
	let namesTweetedAt = content.split('@');
	let tweetedAt = [];
	async.eachSeries(namesTweetedAt, (stringWithName, next) => {
		let idxAfterName = stringWithName.indexOf(" ");
		let username = (idxAfterName === -1) ? stringWithName : stringWithName.slice(0, idxAfterName);
		username = username.capitalize();
		User.getUserByUsername(username, function(user, err){
			if (err) {console.error(`err is ${err}`)}
			if (user !== null){
				const userId = user['_id'];
				const oneTweetedAt = {
					userId,
					username
				}
				tweetedAt.push(oneTweetedAt);
			}
			next()
		})
	}, (err) => {
		cb(tweetedAt);
	})
}

const parseHashtags = (content, cb) => { //SKIP
	let hashTagsWithExtra = content.split('#').slice(1);
	let hashTags = [];
	if (hashTagsWithExtra.length === 0){return cb(hashTags);}
	const hashTagEndings = [" ", "!", "?", ".", ",", ";"]
	async.eachSeries(hashTagsWithExtra, (stringWithHashtag, next) => {
		if (stringWithHashtag === ""){next();}
		const possibleIdxsAfterHashtag = hashTagEndings.map((suffix) => {
			return stringWithHashtag.indexOf(suffix);
		})
		let idxAfterHashtag = possibleIdxsAfterHashtag.reduce((lowestIdx, idx) => {
			if (idx !== -1 && idx < lowestIdx){
				return idx;
			} else {
				return lowestIdx;
			}
		}, Infinity)
		if (idxAfterHashtag === Infinity){
			idxAfterHashtag = -1;
		}
		let hashtagName = (idxAfterHashtag === -1) ? stringWithHashtag : stringWithHashtag.slice(0, idxAfterHashtag)
		hashtagName = hashtagName.capitalize();
		Hashtag.findOne({name: hashtagName}, (err, hashtag) => {
			if (err){throw err;}

			hashTags.push(hashtagName);
			const saveCb = (err) => {
				if (err){throw err;}
				next()
			} 
			if (hashtag){
				hashtag.trendCount++;
				hashtag.save(saveCb)
			} else {
				const newHashtag = new Hashtag({
					name: hashtagName,
					trendCount: 1
				})
				newHashtag.save(saveCb)
			}
		})
	}, (err) => {
		cb(hashTags)
	})
}

// User.findOne({username: oldUsername}, function (err, user) {
//     user.username = newUser.username;
//     user.password = newUser.password;
//     user.rights = newUser.rights;

//     user.save(function (err) {
//         if(err) {
//             console.error('ERROR!');
//         }
//     });
// });

Tweet.getTweetById = function(id, callback){ //OPT
	Tweet.findById(id, callback);
}

User.getUserById = function(id, callback){ //OPT
	User.findById(id, callback);
}

const Constants = {
	FOLLOW: "FOLLOW",
	MENTION: "MENTION"
}

function fullNameOfUser(user){ //OPT
      let names = []
      if (user.firstName) {names.push(user.firstName)};
      if (user.lastName) {names.push(user.lastName)};
      return names.join(" ");
}

User.createFollowNotification = (followedId, followerModel, cb) => { //REVISE protect against multiple follow
	User.getUserById(followedId, (err, followedUser) => {
		if (err){cb(err);}
		const follower = followerModel.toObject();
		follower.notifications = undefined;
		follower.coverImg = undefined;
		follower.password = undefined;
		follower.usersBeingfollowed = undefined;
		follower.usersFollowing = undefined;
		follower.fullName = fullNameOfUser(follower);
		const followNotification = {
			type: Constants.FOLLOW,
			follower,
			userHasSeen: false
		}
		if (!followedUser.notifications.some((notification) => {
			const anotherFollower = notification.follower;
			return (anotherFollower && (anotherFollower['_id'].toString() === follower['_id'].toString()))
		})){
			if (followedUser.notifications.length >= 10){
				followedUser.notifications.shift();
			}
			followedUser.notifications.push(followNotification);
		}
		followedUser.save(cb);
	})
}

User.createMentionNotification = (followedUser, tweet, cb) => {
		const mentionNotification = {
			type: Constants.MENTION,
			tweet,
			userHasSeen: false
		}
		if (followedUser.notifications.length >= 10){
			followedUser.notifications.shift();
		}
		followedUser.notifications.push(mentionNotification);
		followedUser.save(cb);
}

const getFollowing = (userID, callback, type) => {
	const id = mongoose.Types.ObjectId(userID);
	User.findById(id, 'usersBeingFollowed usersFollowing', (err, userOfInterest) => {
		if (err){
			return callback(err);
		} 
		const followingIDs = userOfInterest[type];
		User.find({
			'_id': { $in: followingIDs}
		}).select('username firstName lastName profileImg coverImg').exec(callback);
	})
}

User.usersBeingFollowed = function(userID, callback){
	getFollowing(userID, callback, "usersBeingFollowed");
}


User.usersFollowing = function(userID, callback){
	getFollowing(userID, callback, "usersFollowing");
}

Tweet.getTweetByIdWithAllInfo = (id, cb) => {
	Tweet.findById(id, (err, tweet) => {
		if (err) {return cb(true);}
		const jsonTweet = tweet.toObject();
		getTweetRepliedToAndNext(jsonTweet, undefined, cb);
	});
}

Tweet.createMentionNotifications = (tweet, cb) => {
	async.eachSeries(tweet.tweetedAt, (mentionedUser, next) => {
		User.findById(mentionedUser['userId'], (err, user) => {
			User.createMentionNotification(user, tweet, (err, _) => {
				if (err){throw err;} else {next()}
			})
		})
	}, (err) => {
		if (err) {return cb(false);}
		cb(true);
	})
}
//REVISE test for empty string content
Tweet.postTweet = (content, currUserId, cb) => {
	//REVISE parse content for @s to determine ids
	parseAtSymbols(content, (tweetedAt) => {
		  parseHashtags(content, (hashtagNames) => {
			const newPost = new Tweet({
				content,
				authorId: currUserId,
				tweetedAt,
				hashtags: hashtagNames
			})
			newPost.save((err, newTweet) => {
					if (err) {return cb(true);}
					Tweet.getTweetByIdWithAllInfo(newTweet['_id'], (err, formattedNewTweet) => {
						if (err) {return cb(true);}
						Tweet.createMentionNotifications(formattedNewTweet, (success) => {
							if (success){cb(err, formattedNewTweet);} else {cb(true);}
						})	
					})
			});
		})
	});
}


// REVISE to send back actual tweet
Tweet.retweet = (currUserId, originalTweetId, cb) => { 
	Tweet.getTweetById(originalTweetId, (err, tweet) => {
		if (err) {cb(true);}

		if (tweet){
			const retweet = new Tweet({
				authorId: currUserId,
				originalTweetId: originalTweetId
			})
			retweet.save((err, _) => {
				if (err) {cb(true);}

				Tweet.getTweetByIdWithAllInfo(originalTweetId, cb);
			}); //Revise to send up content of original with retweet
		} else {
			cb(true);
		}
	})
}

Tweet.unretweet = (currUserId, retweetId, cb) => { 
	Tweet.findOneAndRemove({_id: retweetId, authorId: currUserId}, (err, deletedTweet) => {
		if (err || !deletedTweet){
			cb(true);
		} else {
			const originalId = deletedTweet.originalTweetId;
			Tweet.getTweetByIdWithAllInfo(originalId, cb);
		}
	})
}

Tweet.delete = (currUserId, tweetId, cb) => { 
	Tweet.findOneAndRemove({_id: tweetId, authorId: currUserId}, (err, deletedTweet) => {
		if (err || !deletedTweet){
			cb(true);
		} else {
			const deletedId = deletedTweet['_id'];
			Tweet.remove({$or: [{replyToId: deletedId}, {originalTweetId: deletedId}]}, (err) => {
				if (err) {console.err(`delete retweets and replies err is ${err}`);}
			})
			cb(undefined, deletedTweet);
		}
	})
}

const getFeedTweets = (query, cb) => { //OPT
	Tweet.find(query ,null, 
		{limit: 8, sort: { _id: -1}}, //change to limit: 8
		(err, tweets) => {
			const jsonTweets = tweets.map((tweet) => {return tweet.toObject();});
			async.eachSeries(jsonTweets, (tweet, next) => {
				getTweetRepliedToAndNext(tweet, next, undefined);
			}, (err) => {
				cb(err, jsonTweets);
			})
	})
}

Tweet.tweetReplies = (tweetId, lastDownloadedReplyId, cb) => { //OPT
	const query = lastDownloadedReplyId ? {_id: {$lt: lastDownloadedReplyId}} : {};
	query.replyToId = tweetId;
	getFeedTweets(query, cb);
}

Tweet.feedTweets = (currUser, lastDownloadedTweetId, cb) => { //OPT
	const query = lastDownloadedTweetId ? {_id: {$lt: lastDownloadedTweetId}} : {};
	if (currUser){
		query.authorId = {$in: currUser.usersBeingFollowed};
	}
	getFeedTweets(query, cb);
}

Tweet.userTweets = (userId, lastDownloadedTweetId, cb) => { //OPT
	const query = lastDownloadedTweetId ? {_id: {$lt: lastDownloadedTweetId}} : {};
	query.authorId = userId;
	getFeedTweets(query, cb);
}

Tweet.userTweetsWithoutReplies = (userId, lastDownloadedTweetId, cb) => { //OPT
	const query = lastDownloadedTweetId ? {_id: {$lt: lastDownloadedTweetId}} : {};
	query.authorId = userId;
	query.replyToId = {$exists: false};
	getFeedTweets(query, cb);
}

Tweet.getTweetCount = (userId, cb) => { //OPT
	Tweet.count({authorId: userId}, (err, count) => {
		if (err) {cb(err);}
		return cb(null, count);
	})
}

Tweet.replyTweet = (content, currUserId, originalTweet, cb, forSeeding) => { //REVISE disallow self reply
	parseAtSymbols(content, (tweetedAt) => {
		verifyTweetedAtOriginalAuthor(tweetedAt, originalTweet, (didTweetAt) => {
			parseHashtags(content, (hashtagNames) => {
				const newPost = new Tweet({
					content,
					authorId: currUserId,
					tweetedAt,
					replyToId: didTweetAt ? mongoose.Types.ObjectId(originalTweet['_id']) : undefined,
					hashtags: hashtagNames
				})
				newPost.save((err, newReply) => {
					if (err){return (cb(true));}
					const originalId = mongoose.Types.ObjectId(originalTweet['_id']);
					Tweet.getTweetByIdWithAllInfo(originalId, (err, formattedTweet) => {
						if (err){return (cb(true));}
						Tweet.createMentionNotifications(formattedTweet, (success) => {
							if (success) {
								return forSeeding ? cb(null, newReply) : cb(null, formattedTweet);
							} 
							else {return cb(true);}
						})
					})
				});
			})
		})
	})
}

//EVERYTHING BELOW IS FACILITATES TWEET RENDERING
//need _id username, firstname, lastname, coverphoto, profilephoto
//usersBeingfollowed
//usersFollowing
const getAuthorInfoAndNext = (tweet, next, finalCB, tweetToReturn) => { 
			User.findById(tweet.authorId, 'username firstName lastName coverImg profileImg usersBeingFollowed usersFollowing', (err, user) => {
				if (err) {throw err;} //REVISE
				tweet.authorName = user.username;
				tweet.firstName = user.firstName;
				tweet.lastName = user.lastName;
				tweet.user = user.toObject();
				Tweet.getTweetCount(user['_id'], (err, count) => {
					if (err) {throw err;}
					tweet.user.tweetCount = count;
					determineIfRetweet(tweet, next, finalCB, tweetToReturn);
				})				
			})
}

const getTweetRepliedToAndNext = (tweet, next, finalCB) => { //OPT
	if (tweet.replyToId){
		Tweet.findById(tweet.replyToId, (err, tweetRepliedTo) => {
			if (err) {throw err;} //REVISE

			User.findOne({'_id': tweetRepliedTo.authorId}).select('username').exec((err, user) => {
				if (err) {throw err;} //REVISE
				tweet.tweetRepliedTo = {
					_id: tweetRepliedTo['id'],
					authorName: user.username
				};
				getAuthorInfoAndNext(tweet, next, finalCB);
			})
		})
	} else {
		getAuthorInfoAndNext(tweet, next, finalCB);
	}
}

const determineIfRetweet = (tweet, next, finalCB, tweetToReturn) => { //OPT
	const originalId = tweet.originalTweetId;
	if (originalId){
		Tweet.getTweetById(originalId, (err, originalTweet) => {
			if (err) {throw err;} //REVISE
			const jsonOriginalTweet = originalTweet.toObject();
			tweet.originalTweet = jsonOriginalTweet;
			tweet.firstName = undefined;
			tweet.lastName = undefined;
			tweet.user = undefined;
			getAuthorInfoAndNext(jsonOriginalTweet, next, finalCB, tweetToReturn);
		})
	} else {
		getLikesAndNext(tweet, next, finalCB, tweetToReturn);
	}
}

const getLikesAndNext = (tweetToGetLikesFor, next, finalCB, tweetToReturn) => { //OPT
	Like.find({tweetId: tweetToGetLikesFor['_id']}, 'userId', (err, likes) => {
		if (err) {throw err;} //REVISE
		tweetToGetLikesFor.likes = likes;
		getRetweetsAndNext(tweetToGetLikesFor, next, finalCB, tweetToReturn);
	})
}

const getRetweetsAndNext = (tweetToGetRetweetsFor, next, finalCB, tweetToReturn) => { //OPT
	Tweet.find({originalTweetId: tweetToGetRetweetsFor['_id']}, 'authorId', (err, retweets) => {
		if (err) {throw err;} //REVISE
		tweetToGetRetweetsFor.retweets = retweets;
		computeTweetTimeAndNext(tweetToGetRetweetsFor, next, finalCB, tweetToReturn);
	})
}

const secondsInDay = 86400;
const secondsInHour = 3600;
const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept",  "Oct",  "Nov",  "Dec"];

const computeTweetTimeAndNext = (tweetToComputeTimeFor, next, finalCB, tweetToReturn) => { //OPT
	const now = new Date();
	const createdAt = tweetToComputeTimeFor.createdAt;
	const diffInSeconds = (now - createdAt) / 1000;
	if (diffInSeconds < 86400){
		const hoursPast = Math.floor(diffInSeconds / secondsInHour)
		if (hoursPast > 0){
			tweetToComputeTimeFor.tweetTime = `${hoursPast}h`
		} else {
			const minutesPast = Math.floor(diffInSeconds / 60);
			tweetToComputeTimeFor.tweetTime = (minutesPast > 0) ? `${minutesPast}m` : "now";
		}
	} else {
		const dateStr = createdAt.toLocaleDateString()
		const dateArr = dateStr.split('/');
		const month = dateArr[0];
		const day = dateArr[1];
		const year = dateArr[2]
		tweetToComputeTimeFor.tweetTime = `${months[month]} ${day} ${year}`;
	}
	getReplyCountAndComplete(tweetToComputeTimeFor, next, finalCB, tweetToReturn);
}

const getReplyCountAndComplete = (tweetToGetReplyCountFor, next, finalCB, tweetToReturn) => { //OPT
	Tweet.count({replyToId: tweetToGetReplyCountFor['_id']}, (err, count) => {
		if (err) {throw err;}

		tweetToGetReplyCountFor.replyCount = count;

		if (next){
			next()
		} else {
			tweetToReturn ? finalCB(null, tweetToReturn) : finalCB(null, tweetToGetReplyCountFor);
		}		
	})
}

User.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.fullName = newUser.firstName
	        if (newUser.lastName){
	        	newUser.fullName += " ";
	        	newUser.fullName += newUser.lastName;
	        }
	        newUser.save(callback);
	    });
	});
}

User.createUserWithPromise = (newUser) => {
	const promise = new es6Promise.Promise((resolve, reject) => {
		User.createUser(newUser, (err, user) => {
			if (err){throw err;}
			else{resolve(user);}
		})
	})
	return promise;
}

User.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query).then(callback)
     .catch(err => {
       callback(null, err)
     });;
}

User.getUserForProfileByUsername = (username, cb) => {//DO NOT DOWNSAMPLE IMAGES
	User.findOne({username: username}, 'firstName lastName username largeProfileImg largeCoverImg usersBeingFollowed usersFollowing', (err, user) => {
		if (err){return cb(err)};
		if (!user){return cb(null, user)}
		Like.count({userId: user['_id']}, (err, count)=> {
			if (err){return cb(err)};
			const userObj = user.toObject();
			userObj.likeCount = count;
			Tweet.count({authorId: user['_id']}, (err, count) => {
				if (err) {return cb(err);}
				userObj.tweetCount = count;
				return cb(null, userObj);
			})
		})
	})
}

User.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
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
					{safe: true, new: true, fields: {username: 1, usersBeingFollowed: 1, usersFollowing: 1, firstName: 1, lastName: 1, notifications: 1, profileImg: 1, coverImg: 1}},
					function(err, follower){
						if (err){					
							cb(true);
						}
						let followerObj = follower.toObject();
						followerObj.password = "";
						Tweet.getTweetCount(followerObj['_id'], (err, count) => {
							if (err) {								
								return cb(true);};
							followerObj.tweetCount = count;
							User.createFollowNotification(toFollowId, follower, (err, _) => {
								if (err){																		
									console.error('follow notification creation failed');
								} 
							})
							return cb(null, followerObj);
						})
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
					{safe: true, new: true, fields: {username: 1, usersBeingFollowed: 1, usersFollowing: 1, notifications: 1, profileImg: 1, coverImg: 1, firstName: 1, lastName: 1}},
					function(err, follower){
						let followerObj = follower.toObject();
						Tweet.getTweetCount(followerObj['_id'], (err, count) => {
							if (err) {return cb(true);};
							followerObj.password = "";
							followerObj.tweetCount = count;
							cb(null, followerObj);
						})
					}
				)
			}
		})
}

User.toggleFollow = function(currUserId, otherUserId, cb){
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

User.usersMatchingSubstr = (substr, cb) => {
	User.find({$or: [{'username': {$regex: substr, $options: 'i'}}, {'fullName': {$regex: substr, $options: 'i'}}]}, 'firstName lastName username profileImg', {limit: 10}, cb)
}

// User.saveProfilePic = function(userID, callback){

// }

// User.saveCoverPic = function(userID, callback){

// }

Like.toggleLike = (userId, tweetId, cb) => { //REVISE confirm not retweet
	Like.findOneAndRemove({userId, tweetId}, (err, deletedLike) => {
		if (err) {return cb(true);}

		if (deletedLike){
			Tweet.getTweetByIdWithAllInfo(tweetId, cb);
		} else {
			const newLike = new Like({
				userId,
				tweetId
			})
			newLike.save((err, like) => {
				if (err) {return cb(true);}

				Tweet.getTweetByIdWithAllInfo(tweetId, cb);
			})
		}
	})
}

Tweet.likedTweets = (likerId, lastDownloadedTweetId, cb) =>{ //REVISE put in lastDownloaded
	Like.find({'userId': likerId}, null, {sort: {_id: -1}}).exec()
	.then((likes) => {
		return (es6Promise.Promise.all(likes.map((like) => {
			const promise = new es6Promise.Promise((resolve, reject) => {
				Tweet.getTweetByIdWithAllInfo(like.tweetId, (err, tweet) => {
					if (err){throw err;}
					else{resolve(tweet);}
				})
			})
			return promise;
		})))
	})
	.then((tweets) => {
		cb(null, tweets);
	})
	.catch((err) => {
		cb(err);
	})
}

User.createUserWithPromise = (newUser) => {
	const promise = new es6Promise.Promise((resolve, reject) => {
		User.createUser(newUser, (err, user) => {
			if (err){throw err;}
			else{resolve(user);}
		})
	})
	return promise;
}

User.clearNotifications = (userId, cb) => {
	User.getUserById(userId, (err, user) => {
		if (err){throw err;}
		user.notifications.forEach((notification) => {
			notification.userHasSeen = true;
		})
		user.save((err, currUser) => {
			if (err){return cb(err)};

			let user = currUser.toObject();
			user.password = "";
			Tweet.getTweetCount(userId, (err, count) => {
				if (err) {throw err;}
				user.tweetCount = count;
				cb(null, user);
			})
		})
	})
}

User.uploadProfileImg = (userId, profileImg, cb) => {
	User.getUserById(userId, (err, user) => {
		if (err){throw err; }
		user.largeProfileImg = profileImg
		downsizeImg(profileImg, "profile", (err, downsizedImgSmall, downsizedImgBig) => {
			if (err) {return cb(err);}
			user.profileImg = downsizedImgSmall;
			user.largeProfileImg = downsizedImgBig;
			user.save((err, updatedUser) => {
				Tweet.getTweetCount(userId, (err, count) => {
					if (err){throw err;}
					let userObj = user.toObject();
					userObj.tweetCount = count;
					Like.count({userId: userId}, (err, count)=> {
						if (err){throw err;}
						userObj.likeCount = count;
						userObj.password = "";
						cb(err, userObj);
					})
				})
			});
		});
	})
}

 const downsizeImg = (imgData, type, cb) => {
 		let idx = imgData.indexOf(',');
 		const slicedImgData = imgData.slice(idx + 1);
 		const formatSpecifier = imgData.slice(0, idx + 1);
        let imgBuffer =  Buffer.from(slicedImgData, 'base64');

        let smallTargetWidth;
        let smallTargetHeight;
        let bigTargetWidth;
        let bigTargetHeight;

        if (type === 'profile'){
        	smallTargetWidth = 73;
        	smallTargetHeight = 73;
        	bigTargetHeight = 190;
        	bigTargetWidth = 190;
        } else {
        	smallTargetHeight = 96;
        	smallTargetWidth = 288;
        	bigTargetWidth = 1100;
        	bigTargetHeight = 420;
        }

        sharp(imgBuffer)
        .resize(smallTargetWidth, smallTargetHeight)
        .toBuffer()
        .then(buffer => {
        	let data = buffer.toString('base64');        	
        	data = formatSpecifier + data;   
            sharp(imgBuffer)
            .resize(bigTargetWidth, bigTargetHeight)
            .toBuffer()
            .then(buffer => {
            	let bigData = buffer.toString('base64');
            	bigData = formatSpecifier + bigData;          
            	cb(null, data, bigData)
            })
        })
        .catch( (err) => {
        	console.log(`downisze issue ${err}`);
        	cb(err);
    	});
 }

User.uploadCoverImg = (userId, coverImg, cb) => {
	User.getUserById(userId, (err, user) => {
		if (err){throw err;}
		downsizeImg(coverImg, "cover", (err, downsizedImgSmall, downsizedImgBig) => {
					if (err){return cb(err);}
					user.largeCoverImg = downsizedImgBig;
					user.coverImg = downsizedImgSmall;
					user.save((err, updatedUser) => {
					Tweet.getTweetCount(userId, (err, count) => {
						if (err){throw err;}
						let userObj = user.toObject();
						userObj.tweetCount = count;
						Like.count({userId: userId}, (err, count)=> {
							if (err){throw err;}
							userObj.likeCount = count;
							userObj.password = "";
							cb(err, userObj);
						})
					})
				});
		});
	})
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


User.whoToFollow = (currUser, cb) => {
	let query = {};
	if (currUser){
		query['_id'] = {'$ne': currUser['_id'] };
	}
	User.find(query).select('username profileImg firstName lastName usersFollowing').exec()
	.then((users) => {

		let usersBeingFollowedByMe = {};
		let notBeingFollowedOneDegreeAway = [];
		let notBeingFollowedNoRelation = [];

		if (currUser){
			currUser.usersBeingFollowed.forEach((userId) => {
			usersBeingFollowedByMe[userId] = true;
			})
			users.forEach((user) => {
				if (usersBeingFollowedByMe[user['_id']]){
					const userObj = {};
					userObj.fullName = fullNameOfUser(user);
					userObj.username = user.username;
					usersBeingFollowedByMe[user['_id']] = userObj;
				}
			})
		}
		users.forEach((user) => {
			const userId = user['_id']
			if (!usersBeingFollowedByMe[userId]){
				let userObj = user.toObject();
				userObj.fullName = fullNameOfUser(userObj);
				let followeeWhoFollows;
				if (currUser && userObj.usersFollowing.some((userId) => {
					const strUserId = userId.toString();
					followeeWhoFollows = usersBeingFollowedByMe[strUserId];
					return followeeWhoFollows;
				})) {
					userObj.followerWhoWeFollow = followeeWhoFollows;
					notBeingFollowedOneDegreeAway.push(userObj);
				} else {
					notBeingFollowedNoRelation.push(userObj);
				}
			} 
		})
		notBeingFollowedNoRelation = shuffle(notBeingFollowedNoRelation);
		notBeingFollowedOneDegreeAway = shuffle(notBeingFollowedOneDegreeAway);
		cb(null, notBeingFollowedOneDegreeAway.concat(notBeingFollowedNoRelation));
	})
	.catch((err) => {
		cb(err);
	})
}

User.getAllPics = (userIds, cb) => {
	User.find({'_id': {$in: userIds}}, null, {limit: 9})
		.select('username profileImg')
		.exec(cb)
}

Hashtag.trending = (cb) => {
	Hashtag.find({}, null, {limit: 10, sort: {'trendCount': -1}}, cb);
}

Tweet.hashtagTweets = (hashtagName, lastDownloadedTweetId, cb) => { //OPT
	const query = lastDownloadedTweetId ? {_id: {$lt: lastDownloadedTweetId}} : {};
	if (hashtagName.length > 0){
		query.hashtags = hashtagName.capitalize();
	}
	getFeedTweets(query, cb);
}