# Tweeter

[Tweeter.Solutions](http://tweeter.solutions/)

Inspired by Twitter and the beautiful birds of the world, Tweeter.Solutions is a full stack web application deployed on AWS.  A Node.js Express server interfaces with a MongoDB NoSQL database through Mongoose ODM to present a RESTful API to the front end.  Coupled with a Redux architectural framework, React.js sits on the client side providing a seamless, real-time user experience via AJAX calls to Node.  Sessions are created, maintained and destroyed using industry standard Passport.js middleware.  

## Features and Implementation
### Tweets Feed
Whether viewing the homepage, a particular user's tweets, the tweets a user has liked, or the replies to a given tweet, the user is always looking at a `Feed` component consisting of many `Tweet` components.  A `Feed` component always renders all tweets in `TweetReducer`, with the exception of the `Feed` of replies rendered after clicking on an individual tweet.  

![](https://github.com/osandoval42/TwitterClone/blob/master/screenshots/replies.png "Replies")

To prevent unecessary load on the server and speed up the user experience, tweets are pulled down 8 at a time, with 8 additional tweets being fetched each time the user scrolls to the bottom of the feed.  On every fetch a spinner, courtesy of spin.js, is presented to shorten the perceived load time.

![](https://github.com/osandoval42/TwitterClone/blob/master/screenshots/spin.png "Spinner")

For any given feed, a tweet is only rendered once, in its most recent version, regardless of how many times it was retweeted.  Hence when a new tweet comes in (that was recently posted), if it's a retweet with an `originalTweet['_id]` equal to the `id` of an already rendered tweet, then the older tweet leaves the screen to make room for the newer one.  Likewise, when an older tweet comes in (as result of a user scrolling down on the `Feed`), it should not be rendered if it is an older version of an already rendered tweet.

To facilitate O(1) tweet insertion, all tweets in `TweetReducer` and `RepliesReducer` are stored in a customized, more efficient Data Structure differing from an LRU Cache only in that it has no maximum number of elements.  The structure consists of a hash map where each value corresponding to a `tweetId` key is a node in a linked list.  The `val` of each node is of course the tweet.  When inserting a newer tweet, the hash is checked for existence of an older version, and if it does exist than it is pulled out, while the new tweet is placed at the front of the list regardless of whether an older version existed or not.  When inserting an older tweet, it is only inserted if after checking the hash map it is confirmed that no newer version of the tweet already exists. 

```javascript
LimitLessLRUCache.prototype.insertNewestNodeYet = function(key, val){
	let newNode;
	if (this.val(key) === undefined){
		newNode = this.createNewNode(key, val);
	} else {
		let nodeToChange = this.keys[key];
		nodeToChange.val = val;
		const outdatedPrev = nodeToChange.prev;
		const outdatedNext = nodeToChange.next;
		this.joinNodes(outdatedPrev, outdatedNext);
		newNode = nodeToChange;
	}

	let afterHead = this.head.next;
	this.joinNodes(this.head, newNode);
	this.joinNodes(newNode, afterHead);
}

LimitLessLRUCache.prototype.insertOldestNodeYet = function(key, val){
	if (this.val(key) === undefined){
		let newNode = this.createNewNode(key, val);
		let beforeTail = this.tail.prev;
		this.joinNodes(beforeTail, newNode);
		this.joinNodes(newNode, this.tail);
	}
}
```
### Following and Followers

![](https://github.com/osandoval42/TwitterClone/blob/master/screenshots/Following.png "Following")

Upon clicking the following or followers tab on a user's profile, the `Follow` component is rendered and the dispatching of `fetchFollowers` or `fetchFollowing` results in express being asked for the appropriate user data.  For each `User` document Mongo stores the ids of each follower and user being followed in arrays titled `usersFollowing` and `usersBeingFollowed`.  Given the appropriate array, the relevant info for each user is returned to the client where it is stored in the `UserReducer`.  A `User` component is rendered for each user in `Follow`, and is also displayed when hovering over a tweet.

```javascript
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
```
### Search Bar

Upon each character that is changed in the `SearchBar` component, its state is updated and an AJAX request is made to retrieve all users for whom the entered text matches a substring of `username` or `fullName`.  With a little Regex magic Mongo returns all matches in an instant.

![](https://github.com/osandoval42/TwitterClone/blob/master/screenshots/searcher.png "search")

## Author

Oscar Sandoval
