# Tweeter

[Tweeter.Solutions](http://tweeter.solutions/)

Inspired by Twitter and the beautiful birds of the world, Tweeter.Solutions is a full stack web application deployed on AWS.  A Node.js Express server interfaces with a MongoDB NoSQL database through Mongoose ODM to present a RESTful API to the front end.  Coupled with a Redux architectural framework, React.js sits on the client side providing a seamless, real-time user experience via AJAX calls to Node.  Sessions are created, maintained and destroyed using industry standard Passport.js middleware.  

## Features and Implementation
### Tweets Feed
Whether viewing the homepage, a particular user's tweets, the tweets a user has liked, or the replies to a given tweet, the user is always looking at a `Feed` component consisting of many `Tweet` components.  A `Feed` component always renders all tweets from the `TweetReducer`, with the exception of the feed of replies rendered after clicking on an individual tweet, which renders all tweets in `RepliesReducer`.  

PICTURE OF REPLIES FEED

(Tweets are pulled down 8 at a time to take load off the server and speed up user experience, with spinner courtesy of spin.js shortening the user's perceived time waiting for the request to be fulfulled.  SHOW PICTURE OF CIRCLE)

For any given feed, a tweet is only rendered once, in its most recent version, regardless of how many times it was retweeted.  Hence when a new tweet comes in (that was recently posted), if it's a retweet with an `originalTweet['_id]` equal to the `id` of an already rendered tweet, then the older tweet should leave the screen to make room for the newer one.  Likewise, when an older tweet comes in (as result of a user scrolling down on the `Feed`), it should not be rendered if it is an older version of an already rendered tweet.

To facilitate O(1) tweet insertion, all tweets in `TweetReducer` and `RepliesReducer` are stored in a customized, more efficient Data Structure differing from an LRU Cache only in that it has no maximum number of elements.  The structure consists of a hash map where each value corresponding to a `tweetId` key is a node in a linked list.  The `val` of each node is of course the tweet.  When inserting a newer tweet, the hash is checked for existence of an older version, and if it does exist than it is pulled out, while the new tweet is placed at the front of the list regardless of whether an older version existed or not.  When inserting an older tweet, it is only inserted if after checking the hash map it is confirmed that no newer version of the tweet already exists. 

PICTURE OF CODE
