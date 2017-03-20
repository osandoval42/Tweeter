import {YES_TWEET_VIEW, NO_TWEET_VIEW} from '../constants/constants';

const _tweetViewObj = Object.freeze({
  tweet: null,
  errors: []
});

const TweetViewReducer = (state = _tweetViewObj, action) => {
	Object.freeze(state);
	switch(action.type) {
    case YES_TWEET_VIEW:
      const tweet = action.tweet;
      let ret = {tweet}
      return ret;
    case NO_TWEET_VIEW:
      return merge({}, _tweetViewObj);
    default:
      return state;
  	}
}

export default TweetViewReducer;