import {
	RECEIVE_TWEETS,
	RECEIVE_UPDATED_TWEET,
	RECEIVE_NEW_TWEET,
	RESET_TWEETS
} from '../constants/constants';
import merge from 'lodash/merge';
import LimitLessLRUCache from '../data_structures/limitless_lru_cache';
const tweets = new LimitLessLRUCache();

//unecessary for person tweets as each key happens once

const addTweets = (state, tweetsArr) => {
	tweetsArr.forEach((tweet) => {
		let originalTweet = tweet.originalTweet;
		let id;
		if (originalTweet){
			id = originalTweet['_id']
			originalTweet.retweetAuthorName = tweet.authorName;
			state.insertOldestNodeYet(id, originalTweet);
		} else {
			id = tweet['_id'];
			state.insertOldestNodeYet(id, tweet);
		}
	})
	return state;
}

const tweetBelongsToCurrColl = (coll, tweet, isOnHomePage) => {
	if (isOnHomePage){
		return true;
	}
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

//LOOK FOR RECEIVE_TWEET AND UPDATE IT
const TweetReducer = (state = tweets, action) => {
	let stateDup;
	let tweet;
	switch(action.type){
		case RECEIVE_TWEETS:
			// console.log(new Date().getTime());
			if (action.tweetObj.areAdditionalTweets){
				stateDup = state.dup()
				return addTweets(stateDup, action.tweetObj.tweets);
			} else {
				let newColl = new LimitLessLRUCache();
				return addTweets(newColl, action.tweetObj.tweets)
			}
		case RECEIVE_NEW_TWEET:
			stateDup = state.dup()
			tweet = action.tweet;
			if (tweetBelongsToCurrColl(stateDup, tweet, action.isOnHomePage)){
				stateDup.insertNewestNodeYet(tweet['_id'], tweet);
			}
			return stateDup;
		case RECEIVE_UPDATED_TWEET:
			stateDup = state.dup();
			tweet = action.tweet;
			const key = tweet['_id']
			if (key){
				stateDup.updateNode(key, tweet);
			}
			return stateDup;
		case RESET_TWEETS:
			return tweets;
		default:
			return state;
	}
};

export default TweetReducer;