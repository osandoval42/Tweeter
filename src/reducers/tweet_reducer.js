import {
	RECEIVE_TWEETS
} from '../constants/constants';


const tweets = {};

//unecessary for person tweets as each key happens once

const populateTweets = (tweetsArr) => {
	const newTweetsColl = {};
	tweetsArr.forEach((tweet) => {
		let originalTweet = tweet.originalTweet;
		let id;
		if (originalTweet){
			id = originalTweet['_id']
			newTweetsColl[id] = originalTweet;
			newTweetsColl[id].retweetAuthorName = tweet.authorName;
		} else {
			id = tweet['_id'];
			if (newTweetsColl[id] === undefined){
				newTweetsColl[id] = tweet;
			}
		}
	})
	return newTweetsColl;
}

//ENSURE ON RECEIVE TWEET THE ORIGINAL AUTHORNAME
//AND PICTURE IS PRESERVED
const TweetReducer = (state = tweets, action) => {
	switch(action.type){
		case RECEIVE_TWEETS:
			return populateTweets(action.tweets);
		default:
			return state;
	}
};

export default TweetReducer;