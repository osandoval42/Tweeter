import * as APIUtil from '../util/tweet_api_util';
import Constants from '../constants/constants';
import thunk from 'redux-thunk';

//REVISE ADD LAST ID
export const fetchAllTweets = (currUserId) => dispatch => {
	APIUtil.fetchAllTweets(currUserId)
		.then(tweets => dispatch(receiveTweets(tweets))), 
		err => dispatch(receiveErrors(err.responseJSON))
};

export const resetTweets = () => ({
	type: Constants.RESET_TWEETS
})

export const receiveTweets = tweets => ({
	type: Constants.RECEIVE_TWEETS,
	tweets
});

export const receiveErrors = errors => ({
  type: Constants.RECEIVE_ERRORS,
  errors
});