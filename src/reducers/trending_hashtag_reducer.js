import {
TRENDING_HASHTAGS } from '../constants/constants';
import merge from 'lodash/merge';

const _trendingHashtags = [];

const TrendingHashtagReducer = (state = _trendingHashtags, action) => {
  Object.freeze(state)
  switch(action.type) {
    case TRENDING_HASHTAGS:
      return action.hashtagObjs;
    default:
      return state;
  }
};

export default TrendingHashtagReducer;