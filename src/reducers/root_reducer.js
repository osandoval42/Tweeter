import {combineReducers} from 'redux';
import SessionReducer from './session_reducer';
import TweetReducer from './tweet_reducer';
import ProfileUserReducer from './profile_user_reducer';
import UsersReducer from './users_reducer';
import WritingTweetReducer from './writing_tweet_reducer';
import WhoToFollowReducer from './who_to_follow_reducer';
import TweetViewReducer from './tweet_view_reducer';
import RepliesReducer from './replies_reducer';
import LikePicturesReducer from './like_pictures_reducer';
import TrendingHashtagReducer from './trending_hashtag_reducer';
import SessionPopupReducer from './session_popup_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  tweets: TweetReducer,
  profileUser: ProfileUserReducer,
  users: UsersReducer,
  tweetingStatus: WritingTweetReducer,
  whoToFollow: WhoToFollowReducer,
  tweetView: TweetViewReducer,
  replies: RepliesReducer,
  likePictures: LikePicturesReducer,
  trending: TrendingHashtagReducer,
  sessionPopup: SessionPopupReducer
});

export default RootReducer;