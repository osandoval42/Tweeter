import {TWEET_LIKE_PICTURES, TWEET_REPLIED_TO_LIKE_PICTURES, RESET_LIKE_PICTURES} from '../constants/constants';
import merge from 'lodash/merge';

const _likePictures = Object.freeze({
  tweet: [],
  reply: [],
  errors: []
});

function stateCopy(oldState){
  let dup = {};
  dup.tweet = oldState.tweet.map((likeObj) => {
    return merge({}, likeObj);
  })
  dup.reply = oldState.reply.map((likeObj) => {
    return merge({}, likeObj);
  })
  return dup;
}

const LikePicturesReducer = (state = _likePictures, action) => {
	Object.freeze(state);
  let ret;
	switch(action.type) {
    case TWEET_LIKE_PICTURES:
      ret = stateCopy(state);
      ret.tweet = action.pictures
      return ret;
    case TWEET_REPLIED_TO_LIKE_PICTURES:
      ret = stateCopy(state);
      ret.reply = action.pictures
      return ret;
    case RESET_LIKE_PICTURES:
      return merge({}, _likePictures);
    default:
      return state;
  	}
}

export default LikePicturesReducer;