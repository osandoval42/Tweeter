import {
	RECEIVE_TWEETS,
	RECEIVE_TWEET,
	RESET_TWEETS
} from '../constants/constants';
import merge from 'lodash/merge';

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

const tweetBelongsToCurrColl = (coll, tweet) => {
	const tweetIds = Object.keys(coll);
	if (tweetIds.length === 0){
		return false;
	}
	const firstTweetInColl = coll[tweetIds[0]];
	if (firstTweetInColl.retweetAuthorname){
		return (tweet.authorName === firstTweetInColl.retweetAuthorname);
	} else {
		return (tweet.authorName === firstTweetInColl.authorName);
	} 
}

//ENSURE ON RECEIVE TWEET THE ORIGINAL AUTHORNAME
//AND PICTURE IS PRESERVED
//0th is most recent
const TweetReducer = (state = tweets, action) => {
	switch(action.type){
		case RECEIVE_TWEETS:
			debugger;
			return populateTweets(action.tweets);
		case RECEIVE_TWEET:
			const stateDup = merge({}, state);
			const tweet = action.tweet;
			if (tweetBelongsToCurrColl(stateDup, tweet)){
				stateDup[tweet['_id']] = tweet;
			}
			return stateDup;
		case RESET_TWEETS:
			return state;
		default:
			return state;
	}
};

export default TweetReducer;