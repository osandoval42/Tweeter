import {combineReducers} from 'redux';
import SessionReducer from './session_reducer';
import TweetReducer from './tweet_reducer';
import ProfileUserReducer from './profile_user_reducer';
import UsersReducer from './users_reducer';
import WritingTweetReducer from './writing_tweet_reducer';
import WhoToFollowReducer from './who_to_follow_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  tweets: TweetReducer,
  profileUser: ProfileUserReducer,
  users: UsersReducer,
  tweetingStatus: WritingTweetReducer,
  whoToFollow: WhoToFollowReducer
});

export default RootReducer;