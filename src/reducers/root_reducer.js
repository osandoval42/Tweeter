import {combineReducers} from 'redux';
import SessionReducer from './session_reducer';
import TweetReducer from './tweet_reducer';
import ProfileUserReducer from './profile_user_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  tweets: TweetReducer,
  profileUser: ProfileUserReducer
});

export default RootReducer;