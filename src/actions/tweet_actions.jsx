import * as APIUtil from '../util/tweet_api_util';
import Constants from '../constants/constants';
import thunk from 'redux-thunk';

//REVISE ADD LAST ID
export const resetTweets = () => ({
	type: Constants.RESET_TWEETS
})

export const openTweetingInterface = (initialContent, fullNameTo) => {
	return {
	type: Constants.WRITING_TWEET,
	initialContent,
	fullNameTo
	};	
}

export const openReplyingInterface = (originalTweet) => {
	return {
	type: Constants.WRITING_REPLY,
	originalTweet
	};	
}

export const postRetweet = (originalTweetId) => dispatch => {
		APIUtil.postRetweet(originalTweetId)
		.then(revisedOriginalTweet => {
			dispatch(receiveUpdatedTweet(revisedOriginalTweet))}), 
		err => dispatch(receiveErrors(err.responseJSON))
}


export const deleteRetweet = (retweetId) => dispatch =>{
		APIUtil.deleteRetweet(retweetId)
		.then(revisedOriginalTweet => {
			dispatch(receiveUpdatedTweet(revisedOriginalTweet))}), 
		err => dispatch(receiveErrors(err.responseJSON))
}

export const closeTweetingInterface = () => {
	return {
	type: Constants.NOT_WRITING_TWEET,
	};	
}

export const postTweet = (newTweet) => dispatch => {
	APIUtil.postTweet(newTweet)
		.then(newTweet => {
			dispatch(closeTweetingInterface()); //revise provide success feedback
			dispatch(receiveNewTweet(newTweet))}), 
		err => dispatch(receiveErrors(err.responseJSON))
};

export const replyTweet = (originalTweet, replyContent) => dispatch => {
	APIUtil.replyTweet(originalTweet, replyContent)
		.then(updatedOriginalTweet => {
			dispatch(closeTweetingInterface()); //revise provide success feedback
			dispatch(receiveUpdatedTweet(updatedOriginalTweet))}), 
		err => dispatch(receiveErrors(err.responseJSON))
};

export const fetchAllTweets = () => dispatch => {
	dispatch(resetTweets())
	APIUtil.fetchAllTweets()
		.then(tweets => dispatch(receiveTweets(tweets))), 
		err => dispatch(receiveErrors(err.responseJSON))
};

export const fetchTweetsUserLikes = (likerId) => dispatch => {
	dispatch(resetTweets())
	APIUtil.fetchTweetsUserLikes(likerId)
		.then(tweets => dispatch(receiveTweets(tweets))), 
		err => dispatch(receiveErrors(err.responseJSON))
};


export const fetchNonReplyProfileTweets = (currUserId) => dispatch => {
	dispatch(resetTweets())
	APIUtil.fetchNonReplyProfileTweets(currUserId)
		.then(tweets => dispatch(receiveTweets(tweets))), 
		err => dispatch(receiveErrors(err.responseJSON))
};

export const fetchAllUserProfileTweets = (currUserId) => dispatch => {
	dispatch(resetTweets())
	APIUtil.fetchAllUserProfileTweets(currUserId)
		.then(tweets => dispatch(receiveTweets(tweets))), 
		err => dispatch(receiveErrors(err.responseJSON))
};

export const receiveTweets = tweets => ({
	type: Constants.RECEIVE_TWEETS,
	tweets
});

export const receiveNewTweet = tweet => ({
	type: Constants.RECEIVE_NEW_TWEET,
	tweet
});

export const receiveUpdatedTweet = tweet => ({
	type: Constants.RECEIVE_UPDATED_TWEET,
	tweet
});

export const receiveErrors = errors => ({
  type: Constants.RECEIVE_ERRORS,
  errors
});