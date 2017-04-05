import {YES_TWEET_VIEW, YES_TWEET_VIEW_REPLY, NO_TWEET_VIEW} from '../constants/constants';
import merge from 'lodash/merge';

const _tweetViewObj = Object.freeze({
  tweet: null,
  reply: null,
  errors: []
});

const TweetViewReducer = (state = _tweetViewObj, action) => {
	Object.freeze(state);
  let ret;
	switch(action.type) {
    case YES_TWEET_VIEW:
      const tweet = action.tweet;
      ret = {tweet}
      return ret;
    case YES_TWEET_VIEW_REPLY:
      let oldState = merge({}, state);
      oldState.reply = action.reply;
      return oldState;
    case NO_TWEET_VIEW:
      return merge({}, _tweetViewObj);
    default:
      return state;
  	}
}

export default TweetViewReducer;