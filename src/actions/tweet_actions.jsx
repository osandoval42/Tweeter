import * as APIUtil from '../util/tweet_api_util';
import Constants from '../constants/constants';
import thunk from 'redux-thunk';

//REVISE ADD LAST ID
export const resetTweets = () => ({
	type: Constants.RESET_TWEETS
})

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

export const receiveErrors = errors => ({
  type: Constants.RECEIVE_ERRORS,
  errors
});