import User from '../models/user';
import Tweet from '../models/tweet';
import Like from '../models/like/like_complete';
import config from '../config';
var mongoose = require('mongoose');
import es6Promise from 'es6-promise';

mongoose.Promise = es6Promise.Promise;

const db = config.configDB();

const User1 = new User({
	username: "Oscar",
	password: "password"
})
const User2 = new User({
	username: "Max",
	password: "password"
})
const User3 = new User({
	username: "Patrick",
	password: "password"
})
const User4 = new User({
	username: "Andrew",
	password: "password"
})

User.remove().exec()
.then(()=> {
	return Like.remove().exec();
}).then(()=> {
	return Tweet.remove().exec();
})


let Oscar;
let Max;
let Patrick;
let Andrew;

// User.createUser(User1, (err, user) => {
// 	Oscar = user;
// 	console.log(`Oscar is ${Oscar}`);
// })

// User.createUser(User2, (err, user) => {
// 	Max = user;
// })

// User.createUser(User3, (err, user) => {
// 	Patrick = user;
// })
// User.createUser(User4, (err, user) => {
// 	Andrew = user;
// })

User.createUserWithPromise(User1)
.then((newUser) => {return User.createUserWithPromise(User2);})
.then((newUser) => {return User.createUserWithPromise(User3);})
.then((newUser) => {return User.createUserWithPromise(User4);})
.then((newUser) => {console.log(`user 4 is ${newUser}`);})
.catch((err) => {
	console.error(`err is ${err}`)
})



// User.findByIdAndUpdate(Oscar['_id'], 	
// 	{$push: {usersFollowing: Max['_id']}}, null, ()=>{});
// User.findByIdAndUpdate(Oscar['_id'], 	
// 	{$push: {usersFollowing: Andrew['_id']}}, null, ()=>{});
// User.findByIdAndUpdate(Oscar['_id'], 	
// 	{$push: {usersFollowing: Patrick['_id']}}, null, ()=>{});

// User.findByIdAndUpdate(Max['_id'], 	
// 	{$push: {usersBeingFollowed: Oscar['_id']}}, null, ()=>{});
// User.findByIdAndUpdate(Andrew['_id'], 	
// 	{$push: {usersBeingFollowed: Oscar['_id']}}, null, ()=>{});
// User.findByIdAndUpdate(Patrick['_id'], 	
// 	{$push: {usersBeingFollowed: Oscar['_id']}}, null, ()=>{});




