import {receiveUpdatedTweet} from './tweet_actions';
import * as APIUtil from '../util/like_api_util';

export const toggleLike = (tweetId) => dispatch => {
		APIUtil.toggleLike(tweetId)
		.then(revisedOriginalTweet => {
			dispatch(receiveUpdatedTweet(revisedOriginalTweet))}), 
		err => dispatch(receiveErrors(err.responseJSON))
}