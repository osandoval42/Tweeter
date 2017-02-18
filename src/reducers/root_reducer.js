import {combineReducers} from 'redux';
import SessionReducer from './session_reducer';
import TweetReducer from './tweet_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  tweets: TweetReducer
});

export default RootReducer;