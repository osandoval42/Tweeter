import {connect} from 'react-redux';
import Feed from './feed';Feed
import {getHashtagTweets, getTweetReplies, fetchTweetsUserLikes, fetchAllTweets, fetchAllUserProfileTweets, fetchNonReplyProfileTweets} from '../../actions/tweet_actions';


const mapStateToProps = (state) => ({
	profileUser: state.profileUser,
	currUser: state.session.currentUser,
	tweets: state.tweets,
	replies: state.replies
});

const mapDispatchToProps = (dispatch) => ({ //REVISE check that currUserId is needed for all functions
	getCurrUserFeedTweets: (lastTweetFetchedId) => {
		return dispatch(fetchAllTweets(lastTweetFetchedId));
	},
	getNonReplyProfileTweets: (currUserId, lastTweetFetchedId) => {
		return dispatch(fetchNonReplyProfileTweets(currUserId, lastTweetFetchedId));
	},
	getAllProfileTweets: (currUserId, lastTweetFetchedId) => {
		return dispatch(fetchAllUserProfileTweets(currUserId, lastTweetFetchedId));
	},
	getLikedTweets: (currUserId, lastTweetFetchedId) => {
		return dispatch(fetchTweetsUserLikes(currUserId, lastTweetFetchedId))
	},
	fetchReplies: (tweetId, lastTweetFetchedId) => {
		return dispatch(getTweetReplies(tweetId, lastTweetFetchedId))
	},
	fetchHashtagTweets: (hashtagName, lastTweetFetchedId) => {
		return dispatch(getHashtagTweets(hashtagName, lastTweetFetchedId));
	}
});

const FeedContainer = connect(mapStateToProps, mapDispatchToProps)(Feed);

export default FeedContainer;
