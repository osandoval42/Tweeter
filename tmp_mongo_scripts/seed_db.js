import {User, Like, Tweet} from '../models/models'
import config from '../config';
var mongoose = require('mongoose');
import es6Promise from 'es6-promise';

mongoose.Promise = es6Promise.Promise;

const db = config.configDB();

let Oscar = new User({
	username: "Oscar",
	firstName: "Oscar",
	lastName: "Sandoval",
	password: "password"
})
let Max = new User({
	username: "Max",
	firstName: "Max",
	lastName: "Rutyna",
	password: "password"
})
let Patrick = new User({
	username: "Patrick",
	firstName: "Patrick",
	lastName: "Baldwin",
	password: "password"
})
let Andrew = new User({
	username: "Andrew",
	firstName: "Andrew",
	lastName: "Chi",
	password: "password"
})

let likedAndAtTweet;
let oscarsRetweetedTweet;

//DROP DB
User.remove().exec()
.then(()=> {
	return Like.remove().exec();
})
.then(()=> {
	return Tweet.remove().exec();
})
//CREATE USERS
.then(() => {return User.createUserWithPromise(Oscar);})
.then((newUser) => {
	Oscar = newUser;
	return User.createUserWithPromise(Max);})
.then((newUser) => {
	Max = newUser;
	return User.createUserWithPromise(Patrick);})
.then((newUser) => {
	Patrick = newUser;
	return User.createUserWithPromise(Andrew);})
//ADD FOLLOWING RELATIONSHIPS
.then((newUser) => {
	Andrew = newUser;
	return (User.findByIdAndUpdate(Oscar['_id'], 	
	{$push: {usersFollowing: Max['_id']}}, {new: true}).exec())
}) 
.then((updatedUser) => {
	Oscar = updatedUser;
	return (User.findByIdAndUpdate(Oscar['_id'], 	
	{$push: {usersFollowing: Andrew['_id']}}, {new: true}).exec())
})
.then((updatedUser) => {
	Oscar = updatedUser;
	return (User.findByIdAndUpdate(Oscar['_id'], 	
	{$push: {usersFollowing: Patrick['_id']}}, {new: true}).exec())
})
.then((updatedUser) => {
	Oscar = updatedUser;
	console.log(`new user after update 3 is ${updatedUser}`)
	return (User.findByIdAndUpdate(Max['_id'], 	
	{$push: {usersBeingFollowed: Oscar['_id']}}, {new: true}).exec())
})
.then((updatedUser) => {
	Max = updatedUser;
	return (User.findByIdAndUpdate(Andrew['_id'], 	
	{$push: {usersBeingFollowed: Oscar['_id']}}, {new: true}).exec())
})
.then((updatedUser) => {
	Andrew = updatedUser;
	return (User.findByIdAndUpdate(Patrick['_id'], 	
	{$push: {usersBeingFollowed: Oscar['_id']}}, {new: true}).exec())
})
.then((updatedUser) => {
	Patrick = updatedUser;
	return (User.findByIdAndUpdate(Oscar['_id'], 	
	{$push: {usersBeingFollowed: Max['_id']}}, {new: true}).exec())
})
.then((updatedUser) => {
	Oscar = updatedUser;
	return (User.findByIdAndUpdate(Max['_id'], 	
	{$push: {usersFollowing: Oscar['_id']}}, {new: true}).exec())
})
//create tweets
.then((updatedUser) => {
	Max = updatedUser;
	const newTweet = new Tweet({
		content: "Oscar's first tweet",
		authorId: Oscar['_id'],
	})
	return newTweet.save();
})
.then((savedTweet) => {
	const newTweet = new Tweet({
		content: "Oscar's first tweet at the homies",
		authorId: Oscar['_id'],
		tweetedAt: [Max['_id'], Patrick['_id'], Andrew['_id']],
		likeCount: 2
	})
	return newTweet.save();
})
.then((savedTweet) => {
	likedAndAtTweet = savedTweet;
	const newTweet = new Tweet({
		content: "Oscar's retweeted tweet",
		authorId: Oscar['_id'],
	})
	return newTweet.save();
})
.then((savedTweet) => {
	oscarsRetweetedTweet = savedTweet;
	const newTweet = new Tweet({
		originalTweetId: savedTweet['_id'],
		authorId: Max['_id']
	})
	return newTweet.save();
})
.then((savedTweet) => {
	const newTweet = new Tweet({
		originalTweetId: oscarsRetweetedTweet['_id'],
		authorId: Patrick['_id']
	})
	return newTweet.save();
})
.then((savedTweet) => {
	const newTweet = new Tweet({
		content: "@Oscar this is Cancer",
		replyToId: oscarsRetweetedTweet['_id'],
		authorId: Andrew['_id'],
		tweetedAt: [Oscar['_id']]
	})
	return newTweet.save();
})
//ADD LIKES
.then((newTweet) => {
	const newLike = new Like({
		tweetId: likedAndAtTweet['_id'],
		userId: Max['_id']
	})
	return newLike.save();
})
.then((savedLike) => {
	const newLike = new Like({
		tweetId: likedAndAtTweet['_id'],
		userId: Andrew['_id']
	})
	return newLike.save();
})
.then((savedLike) => {

})
.catch((err) => {
	console.error(`err is ${err}`)
})





