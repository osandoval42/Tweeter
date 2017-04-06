import {User, Like, Tweet, Hashtag} from '../models/models'
import config from '../config';
var mongoose = require('mongoose');
import es6Promise from 'es6-promise';

var fs = require('fs');
// fs.readFile('./tweeter_pictures/ho-oh_profile.png', 'base64', function(err, data){
// 	console.log(`err is ${err}`);
// 	console.log(`data is ${data}`);
// })

mongoose.Promise = es6Promise.Promise;

const db = config.configDB();

const fileExtensionRegex = /(?:\.([^.]+))?$/;

function addPicture(location, user, profile){
	const promise = new es6Promise.Promise((resolve, reject) => {
		fs.readFile(location, 'base64', (err, data) => {
			if (err){throw err;}
			else{
				const fileType = fileExtensionRegex.exec(location)[1];
				let base64Data;
				if (fileType === "png"){
					base64Data = "data:image/png;base64," + data;
				} else if (fileType === "jpeg" || fileType === "jpg"){
					base64Data = "data:image/jpeg;base64," + data;
				} else {
					throw err;
				}

				user[profile ? "profileImg" : "coverImg"] = base64Data;
				user.save((err, updatedUser) => {
					if (err){throw err;}
					else {
						resolve(user);
					}
				})		
			}
		})
	})
	return promise;
}

function createUserWithPictures(user, profileLocation, coverLocation){
	const promise = new es6Promise.Promise((resolve, reject) => {
		User.createUserWithPromise(user)
		.then((newUser) => {
			return addPicture(profileLocation, user, true)	
		})
		.then((updatedUser) => {
			return addPicture(coverLocation, user, false)	
		})
		.then((updatedUser) => {
			resolve(updatedUser);
		})
	})
	return promise;
}

function follow(followingUser, userBeingFollowed){
	const followingId = mongoose.Types.ObjectId(followingUser['_id']);
	const beingFollowedId = mongoose.Types.ObjectId(userBeingFollowed['_id']);
	const promise = new es6Promise.Promise((resolve, reject) => {
		User.toggleFollow(followingId, beingFollowedId, (err, user) => {
			if (err){
				console.log(`err is ${err} user is ${user} followingUser was ${followingUser['_id']}, beingFollowed user was ${userBeingFollowed['_id']}`)
				throw err;}
			resolve()
		})
	})
	return promise;
}

function postTweet(content, user){
	const currUserId = mongoose.Types.ObjectId(user['_id']);
	const promise = new es6Promise.Promise((resolve, reject) => {
		Tweet.postTweet(content, currUserId, (err, newPost) => {
			if (err){
				throw(err);
			}
			resolve(newPost);	
		})
	})
	return promise;
}

function postReply(content, poster, originalTweet){
	const currUserId = poster['_id']
	const promise = new es6Promise.Promise((resolve, reject) => {
		Tweet.replyTweet(content, currUserId, originalTweet, (err, newReply) => {
			if (err){
				throw(err);
			} 
			resolve(newReply);	
		}, true)
	})
	return promise;
}

function getTweetById(id){
	const promise = new es6Promise.Promise((resolve, reject) => {
		Tweet.getTweetByIdWithAllInfo(id, (err, tweet) => {
			if (err){throw err;}
			resolve(tweet);
		})
	})
	return promise;
}

function retweet(currUser, originalTweet){
	const currUserId = mongoose.Types.ObjectId(currUser['_id']);
	let tweetId = originalTweet['_id'];
	if (typeof tweetId === String){
		tweetId = mongoose.Types.ObjectId(tweetId);
	}
	const promise = new es6Promise.Promise((resolve, reject) => {
		Tweet.retweet(currUserId, tweetId, (err, updatedOriginalTweet) => {
			if (err){throw err;}
			resolve(updatedOriginalTweet);
		})
	})
	return promise;
}

function like(currUser, tweet){
	const currUserId = currUser['_id'];
	let tweetId = tweet['_id'];
	if (typeof tweetId === String){
		tweetId = mongoose.Types.ObjectId(tweetId);
	}
	const promise = new es6Promise.Promise((resolve, reject) => {
		Like.toggleLike(currUserId, tweetId, (err, updatedTweet) => {
			if (err){throw err;}
			resolve(updatedTweet);
		})
	})
	return promise;
}

function delay(milliseconds){
	const promise = new es6Promise.Promise((resolve, reject) => {
		setTimeout(() => {
			resolve()
		}, milliseconds)
	})
	return promise;
}

let HoOh = new User({
	username: "Ho-oh",
	firstName: "Ho",
	lastName: "Oh",
	password: "password"
})
let Bluejay = new User({
	username: "Bluejay",
	firstName: "Jay",
	lastName: "Blue",
	password: "password"
})
let LarryBird = new User({
	username: "Boston_green",
	firstName: "Larry",
	lastName: "Bird",
	password: "password"
})
let BabyFace = new User({
	username: "Minerva",
	firstName: "Baby",
	lastName: "Face",
	password: "password"
})
let BigBird = new User({
	username: "Big_bird",
	firstName: "Big",
	lastName: "Bird",
	password: "password"
})
let Birdman = new User({
	username: "Birdman",
	firstName: "Byron",
	lastName: "Williams",
	password: "password"
})
let Genghis = new User({
	username: "Eagle_eye",
	firstName: "Genghis",
	lastName: "Khan",
	password: "password"
})
let LittleRed = new User({
	username: "Too_cute33",
	firstName: "Little",
	lastName: "Red",
	password: "password"
})
let Falco = new User({
	username: "Falco42",
	firstName: "Falco",
	lastName: "Lombardi",
	password: "password"
})


// let likedAndAtTweet;
// let oscarsRetweetedTweet;
let bluejayTweetTweet;
let dontTrustTweet;
let concertRequest;
let candidacyAnnouncement;
let shootingRequest;
let loveTweet;
let sadTweet;
let kingdomTweet;
let BBForPrez;
let concertAnticipation;
let migrationTweet;
let reformTweet;
let flockTweet;
let amen;
let loveBirdsTweet;
let balling;
let respek;
let vampsNGrouches;
let barrellRoll;
let hungryTweet;
let loveAccusation;
let tailKickin;
let cacaw;
let cacawww;

//DROP DB
User.remove().exec()
.then(()=> {
	return Like.remove().exec();
})
.then(()=> {
	return Tweet.remove().exec();
})
.then(()=> {
	return Hashtag.remove().exec();
})
//CREATE USERS
.then(() => {return createUserWithPictures(HoOh, './tweeter_pictures/ho-oh_profile.png', './tweeter_pictures/ho-oh_cover.png');})
.then((newUser) => {
	HoOh = newUser;
	return createUserWithPictures(Bluejay, './tweeter_pictures/bluejay_profile.jpg', './tweeter_pictures/bluejay_cover.jpeg');})
.then((newUser) => {
	Bluejay = newUser;
	return createUserWithPictures(LarryBird, './tweeter_pictures/larry_profile.jpg', './tweeter_pictures/larry_cover.png');})
.then((newUser) => {
	LarryBird = newUser;
	return createUserWithPictures(BabyFace, './tweeter_pictures/owl_profile.jpeg', './tweeter_pictures/owl_cover.jpeg');})
.then((newUser) => {
	BabyFace = newUser;
	return createUserWithPictures(BigBird, './tweeter_pictures/big_bird_profile.jpg', './tweeter_pictures/big_bird_cover.jpg');})
.then((newUser) => {
	BigBird = newUser;
	return createUserWithPictures(Birdman, './tweeter_pictures/birdman_profile.jpeg', './tweeter_pictures/birdman_cover.jpg');})
.then((newUser) => {
	Birdman = newUser;
	return createUserWithPictures(Genghis, './tweeter_pictures/eagle_profile.jpg', './tweeter_pictures/eagle_cover.jpg');})
.then((newUser) => {
	Genghis = newUser
	return createUserWithPictures(LittleRed, './tweeter_pictures/tanager_profile.jpeg', './tweeter_pictures/tanager_cover.jpeg');})
.then((newUser) => {
	LittleRed = newUser;
	return createUserWithPictures(Falco, './tweeter_pictures/falco_profile.png', './tweeter_pictures/falco_cover.jpg');})
.then((newUser) => {
	Falco = newUser
	return follow(HoOh, BigBird);})
.then(() => {return follow(Bluejay, BigBird);})
.then(() => {return follow(LarryBird, BigBird);})
.then(() => {return follow(BabyFace, BigBird);})
.then(() => {return follow(LittleRed, BigBird);})
.then(() => {return follow(Birdman, BigBird);})
.then(() => {return follow(Genghis, BigBird);})
.then(() => {return follow(Falco, BigBird);})
.then(() => {return follow(Genghis, HoOh);})
.then(() => {return follow(BabyFace, HoOh);})
.then(() => {return follow(BabyFace, Bluejay);})
.then(() => {return follow(Genghis, Bluejay);})
.then(() => {return follow(BigBird, LarryBird);})
.then(() => {return follow(Falco, LarryBird);})
.then(() => {return follow(BabyFace, LarryBird);})
.then(() => {return follow(Birdman, LarryBird);})
.then(() => {return follow(Birdman, BabyFace);})
.then(() => {return follow(Bluejay, BabyFace);})
.then(() => {return follow(BigBird, Birdman);})
.then(() => {return follow(Bluejay, Birdman);})
.then(() => {return follow(Genghis, Birdman);})
.then(() => {return follow(LarryBird, Birdman);})
.then(() => {return follow(BabyFace, Birdman);})
.then(() => {return follow(HoOh, Birdman);})
.then(() => {return follow(HoOh, Genghis);})
.then(() => {return follow(BabyFace, Genghis);})
.then(() => {return follow(LarryBird, Genghis);})
.then(() => {return follow(BabyFace, LittleRed);})
.then(() => {return follow(Bluejay, LittleRed);})
.then(() => {return follow(HoOh, LittleRed);})
.then(() => {return follow(Falco, LittleRed);})
.then(() => {return follow(Genghis, LittleRed);})
.then(() => {return follow(BigBird, Falco);})
.then(() => {return follow(HoOh, Falco);})
.then(() => {return follow(Genghis, Falco);})
.then(() => {return follow(Bluejay, Falco);})
.then(() => {return follow(Birdman, Falco);})
.then(() => {
	const content = "Do a barrel roll!"
	return postTweet(content ,Falco)})
.then((firstTweet) => {
	barrellRoll = firstTweet;
	const content = "@Minerva Hey bae"
	return postTweet(content ,Falco)})
.then((newTweet) => {
	loveTweet = newTweet;
	const content = "@Too_cute33 Hey Red, what have you been up to?"
	return postTweet(content ,Falco)})
.then(() => {
	const content = "Tired..."
	return postTweet(content ,Falco)})
.then(() => {
	const content = "Going south for the winter #MigrationLife"
	return postTweet(content , Bluejay)})
.then((newTweet) => {
	migrationTweet = newTweet;
	const content = "@Too_cute33 Want to head south with me? #MigrationLife"
	return postTweet(content , Bluejay)})
.then(() => {
	const content = "Feeling blue #sadtweet"
	return postTweet(content , Bluejay)})
.then((newTweet) => {
	sadTweet = newTweet;
	const content = "Tweet tweet tweet"
	return postTweet(content , Bluejay)})
.then((newTweet) => {
	bluejayTweetTweet = newTweet
	const content = "Can't wait for your concert next weekend @Birdman #popbottles"
	return postTweet(content , Bluejay)})
.then((newTweet) => {
	concertAnticipation = newTweet;
	const content = "@Too_cute33 I'm feeling kind of hungry..."
	return postTweet(content , Genghis)})
.then((newTweet) => {
	hungryTweet = newTweet;
	const content = "This is my kingdom! #BirdsOfPrey"
	return postTweet(content , Genghis)})
.then((newTweet) => {
	kingdomTweet = newTweet;
	const content = "@Bluejay don't trust @Eagle_eye #Birdsofprey"
	return postTweet(content , BigBird)})
.then((newTweet) => {
	dontTrustTweet = newTweet;
	const content = "@Boston_green I need help with my jumpshot"
	return postTweet(content , BigBird)})
.then((newTweet) => {
	shootingRequest = newTweet;
	const content = "@Falco42 We would love to have you on #Sesamestreet sometime! Tweet at me!"
	return postTweet(content , BigBird)})
.then(() => {
	const content = "#2020 will be all about the kids! Education reform and an economic policy led by the Count himself!"
	return postTweet(content , BigBird)})
.then((newTweet) => {
	reformTweet = newTweet
	const content = "@Birdman Can you throw a concert for my campaign please Mr. Birdman"
	return postTweet(content , BigBird)})
.then((newTweet) => {
	concertRequest = newTweet;
	const content = "@Eagle_eye Put some respek on my name"
	return postTweet(content , Birdman)})
.then((newTweet) => {
	respek = newTweet;
	const content = "BRRRRRRR"
	return postTweet(content , Birdman)})
.then(() => {
	const content = "BRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR"
	return postTweet(content , Birdman)})
.then(() => {
	const content = "BRRR BRRRR"
	return postTweet(content , Birdman)})
.then(() => {
	const content = "Balling this weekend"
	return postTweet(content , LarryBird)})
.then((newTweet) => {
	balling = newTweet;
	const content = "Tweet tweet tweet tweet tweet"
	return postTweet(content , LarryBird)})
.then(() => {
	const content = "Hoot hoot hoot"
	return postTweet(content , BabyFace)})
.then(() => {
	const content = "Hoot hoot hoot hoot hoot"
	return postTweet(content , BabyFace)})
.then(() => {
	const content = "Don't let the baby face fool you"
	return postTweet(content , BabyFace)})
.then(() => {
	const content = "I don't follow, I lead!"
	return postTweet(content , LittleRed)})
.then(() => {
	const content = "@Eagle_eye You wanna mess with me!"
	return postTweet(content , LittleRed)})
.then(() => {
	const content = "@Bluejay I'm flying south next month #MIGRATIONLIFE"
	return postTweet(content , LittleRed)})
.then(() => {
	const content = "Tweet tweet!"
	return postTweet(content , LittleRed)})
.then(() => {
	const content = "@Minerva show me some wisdom"
	return postTweet(content , LittleRed)})
.then(() => {
	const content = "@Birdman BRRRRRR"
	return postTweet(content , LittleRed)})
.then(() => {
	const content = "I'm announcing my candidacy for #2020. WE WILL NOT LET SESAME STREET DIE! #Sesamestreet"
	return postTweet(content , BigBird)})
.then((newTweet) => {
	candidacyAnnouncement = newTweet;
	const content = "Cacaw!";
	return postTweet(content , HoOh)})
.then((newTweet) => {
	cacaw = newTweet;
	const content = "Cacaw CACAWWWW!";
	return postTweet(content , HoOh)})
.then((newTweet) => {
	cacawww = newTweet;
	const content = "@Bluejay Tweet tweet";
	const originalTweet = bluejayTweetTweet;
	return postReply(content, Genghis, originalTweet);})
.then(() => {
	const content = "@Bluejay TWEET TWEET TWEET TWEET!";
	const originalTweet = bluejayTweetTweet;
	return postReply(content, Genghis, originalTweet);})
.then(() => {
	const content = "@Bluejay @Big_bird shut your beak!";
	const originalTweet = dontTrustTweet;
	return postReply(content, Genghis, originalTweet);})
.then((newReply) => {
	const content = "@Eagle_eye I know vampires and grouches that live in trash cans. Don't mess with the team #Sesamestreet";
	const originalTweet = newReply;
	return postReply(content, BigBird, originalTweet);})
.then((newReply) => {
	vampsNGrouches = newReply;
	const content = "@Big_bird I got you #2020";
	const originalTweet = concertRequest;
	return postReply(content, Birdman, originalTweet);})
.then(() => {
	const content = "@Big_bird Amen";
	const originalTweet = candidacyAnnouncement;
	return postReply(content, Birdman, originalTweet);})
.then((newTweet) => {
	amen = newTweet;
	const content = "@Big_bird No worries, come over next weekend!";
	const originalTweet = shootingRequest;
	return postReply(content, LarryBird, originalTweet);})
.then(() => {
	const content = "@Falco42 <3";
	const originalTweet = loveTweet;
	return postReply(content, BabyFace, originalTweet);})
.then((newTweet) => {
	loveBirdsTweet = newTweet;
	const content = "@Big_bird You have my vote!";
	const originalTweet = candidacyAnnouncement;
	return postReply(content, BabyFace, originalTweet);})
.then(() => {
	const content = "@Bluejay Cheer up!";
	const originalTweet = sadTweet;
	return postReply(content, BabyFace, originalTweet);})
.then(() => {
	const content = "@Eagle_eye Who the hoot do you think you are?!";
	const originalTweet = kingdomTweet;
	return postReply(content, BabyFace, originalTweet);})
.then(() => {
	const content = "@Big_bird for president!";
	const originalTweet = candidacyAnnouncement;
	return postReply(content, LittleRed, originalTweet);})
.then((newTweet) => {
	BBForPrez = newTweet;
	const content = "@Big_bird I'll get my flock behind you";
	const originalTweet = candidacyAnnouncement;
	return postReply(content, Bluejay, originalTweet);})
.then((newTweet) => {
	flockTweet = newTweet;
	const content = "@Big_bird CACAWWWWWW!";
	const originalTweet = candidacyAnnouncement;
	return postReply(content, HoOh, originalTweet);})
.then(() => {
	const content = "@Big_bird :)";
	const originalTweet = candidacyAnnouncement;
	return postReply(content, LarryBird, originalTweet);})
.then(() => {
	const content = "@Big_bird Lets kick some tail!";
	const originalTweet = candidacyAnnouncement;
	return postReply(content, Falco, originalTweet);})
.then((newReply) => {
	tailKickin = newReply;
	const content = "@Big_bird You stand 0 chance";
	const originalTweet = candidacyAnnouncement;
	return postReply(content, Genghis, originalTweet);})
.then(() => {
	const content = "@Big_bird Don't listen to him, you got this!";
	const originalTweet = candidacyAnnouncement;
	return postReply(content, Falco, originalTweet);})
.then(() => {
	const content = "@Big_bird CACAW CACAW CACAW!";
	const originalTweet = candidacyAnnouncement;
	return postReply(content, HoOh, originalTweet);})
.then(() => {
	const content = "@Big_bird tweet tweet";
	const originalTweet = candidacyAnnouncement;
	return postReply(content, LittleRed, originalTweet);})
.then(() => {
	const originalTweet = candidacyAnnouncement;
	return retweet(BigBird, originalTweet);})
.then(() => {
	const originalTweet = BBForPrez;
	return retweet(BigBird, originalTweet);})
.then(() => {
	const originalTweet = candidacyAnnouncement;
	return retweet(LittleRed, originalTweet);})
.then(() => {
	const originalTweet = candidacyAnnouncement;
	return retweet(LarryBird, originalTweet);})
.then(() => {
	const originalTweet = candidacyAnnouncement;
	return retweet(HoOh, originalTweet);})
.then(() => {
	const originalTweet = candidacyAnnouncement;
	return retweet(Bluejay, originalTweet);})
.then(() => {
	const originalTweet = candidacyAnnouncement;
	return retweet(Falco, originalTweet);})
.then(() => {
	const originalTweet = candidacyAnnouncement;
	return retweet(Birdman, originalTweet);})
.then(() => {
	const originalTweet = candidacyAnnouncement;
	return retweet(BabyFace, originalTweet);})
.then(() => {
	const originalTweet = kingdomTweet;
	return retweet(HoOh, originalTweet);})
.then(() => {
	const originalTweet = concertAnticipation;
	return retweet(LittleRed, originalTweet);})
.then(() => {
	const originalTweet = concertAnticipation;
	return retweet(LarryBird, originalTweet);})
.then(() => {
	const originalTweet = concertAnticipation;
	return retweet(HoOh, originalTweet);})
.then(() => {
	const originalTweet = concertAnticipation;
	return retweet(Genghis, originalTweet);})
.then(() => {
	const originalTweet = migrationTweet;
	return retweet(HoOh, originalTweet);})
.then(() => {
	const originalTweet = migrationTweet;
	return retweet(LittleRed, originalTweet);})
.then(() => {
	const originalTweet = reformTweet;
	return retweet(HoOh, originalTweet);})
.then(() => {
	const originalTweet = reformTweet;
	return retweet(Falco, originalTweet);})
.then(() => {
	const originalTweet = reformTweet;
	return retweet(BabyFace, originalTweet);})
.then(() => {
	const originalTweet = reformTweet;
	return retweet(LarryBird, originalTweet);})
.then(() => {
	const originalTweet = flockTweet;
	return retweet(BigBird, originalTweet);})
.then(() => {
	const originalTweet = amen;
	return retweet(LittleRed, originalTweet);})
.then(() => {
	const originalTweet = amen;
	return retweet(HoOh, originalTweet);})
.then(() => {
	const originalTweet = amen;
	return retweet(Falco, originalTweet);})
.then(() => {
	const content = "@Minerva @Falco #Lovebirds";
	const originalTweet = loveBirdsTweet;
	return postReply(content, Bluejay, originalTweet);})
.then((newReply) => {
	loveAccusation = newReply;
	const originalTweet = candidacyAnnouncement;
	return like(Bluejay, originalTweet);})
.then(() => {
	const originalTweet = candidacyAnnouncement;
	return like(HoOh, originalTweet);})
.then(() => {
	const originalTweet = candidacyAnnouncement;
	return like(LarryBird, originalTweet);})
.then(() => {
	const originalTweet = candidacyAnnouncement;
	return like(BabyFace, originalTweet);})
.then(() => {
	const originalTweet = candidacyAnnouncement;
	return like(BigBird, originalTweet);})
.then(() => {
	const originalTweet = candidacyAnnouncement;
	return like(Birdman, originalTweet);})
.then(() => {
	const originalTweet = candidacyAnnouncement;
	return like(LittleRed, originalTweet);})
.then(() => {
	const originalTweet = candidacyAnnouncement;
	return like(Falco, originalTweet);})
.then(() => {
	const originalTweet = balling;
	return like(Falco, originalTweet);})
.then(() => {
	const originalTweet = balling;
	return like(BigBird, originalTweet);})
.then(() => {
	const originalTweet = balling;
	return like(Genghis, originalTweet);})
.then(() => {
	const originalTweet = balling;
	return like(HoOh, originalTweet);})
.then(() => {
	const originalTweet = respek;
	return like(HoOh, originalTweet);})
.then(() => {
	const originalTweet = respek;
	return like(BigBird, originalTweet);})
.then(() => {
	const originalTweet = respek;
	return like(Genghis, originalTweet);})
.then(() => {
	const originalTweet = respek;
	return like(LittleRed, originalTweet);})
.then(() => {
	const originalTweet = vampsNGrouches;
	return like(LittleRed, originalTweet);})
.then(() => {
	const originalTweet = vampsNGrouches;
	return like(LarryBird, originalTweet);})
.then(() => {
	const originalTweet = vampsNGrouches;
	return like(BabyFace, originalTweet);})
.then(() => {
	const originalTweet = kingdomTweet;
	return like(HoOh, originalTweet);})
.then(() => {
	const originalTweet = kingdomTweet;
	return like(Birdman, originalTweet);})
.then(() => {
	const originalTweet = barrellRoll;
	return like(Birdman, originalTweet);})
.then(() => {
	const originalTweet = barrellRoll;
	return like(Falco, originalTweet);})
.then(() => {
	const originalTweet = barrellRoll;
	return like(BigBird, originalTweet);})
.then(() => {
	const originalTweet = barrellRoll;
	return like(Genghis, originalTweet);})
.then(() => {
	const originalTweet = barrellRoll;
	return like(Bluejay, originalTweet);})
.then(() => {
	const originalTweet = migrationTweet;
	return like(LittleRed, originalTweet);})
.then(() => {
	const originalTweet = migrationTweet;
	return like(BabyFace, originalTweet);})
.then(() => {
	const originalTweet = migrationTweet;
	return like(HoOh, originalTweet);})
.then(() => {
	const originalTweet = concertAnticipation;
	return like(BabyFace, originalTweet);})
.then(() => {
	const originalTweet = concertAnticipation;
	return like(Birdman, originalTweet);})
.then(() => {
	const originalTweet = concertAnticipation;
	return like(BigBird, originalTweet);})
.then(() => {
	const originalTweet = concertAnticipation;
	return like(LarryBird, originalTweet);})
.then(() => {
	const originalTweet = hungryTweet;
	return like(HoOh, originalTweet);})
.then(() => {
	const originalTweet = hungryTweet;
	return like(Genghis, originalTweet);})
.then(() => {
	const originalTweet = flockTweet;
	return like(BigBird, originalTweet);})
.then(() => {
	const originalTweet = flockTweet;
	return like(Birdman, originalTweet);})
.then(() => {
	const originalTweet = reformTweet;
	return like(LittleRed, originalTweet);})
.then(() => {
	const originalTweet = reformTweet;
	return like(Bluejay, originalTweet);})
.then(() => {
	const originalTweet = reformTweet;
	return like(BabyFace, originalTweet);})
.then(() => {
	const originalTweet = loveAccusation;
	return like(LarryBird, originalTweet);})
.then(() => {
	const originalTweet = loveAccusation;
	return like(BigBird, originalTweet);})
.then(() => {
	const originalTweet = tailKickin;
	return like(BigBird, originalTweet);})
.then(() => {
	const originalTweet = cacaw;
	return like(Genghis, originalTweet);})
.then(() => {
	const originalTweet = amen;
	return like(LarryBird, originalTweet);})
.then(() => {
	const originalTweet = amen;
	return like(Falco, originalTweet);})
.then(() => {
	const originalTweet = cacawww;
	return like(Falco, originalTweet);})
.then(() => {
	const originalTweet = cacawww;
	return like(LarryBird, originalTweet);})
.then(() => {
	console.log("DB SEEDED")
	process.exit(0);
})
.catch((err) => {
	console.error(`err is ${err}`)
	process.exit(1);
})



// .then(() => {return delay(5000);})







