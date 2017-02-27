import {
	RECEIVE_TWEETS,
	RECEIVE_TWEET,
	RESET_TWEETS
} from '../constants/constants';
import merge from 'lodash/merge';
import LimitLessLRUCache from '../data_structures/limitless_lru_cache';

const tweets = new LimitLessLRUCache();

//unecessary for person tweets as each key happens once

const populateTweets = (tweetsArr) => {
	const newTweetsColl = new LimitLessLRUCache();
	tweetsArr.forEach((tweet) => {
		let originalTweet = tweet.originalTweet;
		let id;
		if (originalTweet){
			id = originalTweet['_id']
			originalTweet.retweetAuthorName = tweet.authorName;
			newTweetsColl.insertOldestNodeYet(id, originalTweet);
		} else {
			id = tweet['_id'];
			newTweetsColl.insertOldestNodeYet(id, tweet);
		}
	})
	return newTweetsColl;
}

const tweetBelongsToCurrColl = (coll, tweet) => {
	if (coll.length === 0){
		return false;
	}
	const firstTweetInColl = coll.first();
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
			return populateTweets(action.tweets);
		case RECEIVE_TWEET:
			const stateDup = state.dup()
			const tweet = action.tweet;
			if (tweetBelongsToCurrColl(stateDup, tweet)){
				stateDup.insertNewestNodeYet(tweet['_id'], tweet);
			}
			return stateDup;
		case RESET_TWEETS:
			return state;
		default:
			return state;
	}
};

export default TweetReducer;