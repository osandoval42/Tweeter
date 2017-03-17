import {connect} from 'react-redux';
import Feed from './feed';
import {fetchTweetsUserLikes, fetchAllTweets, fetchAllUserProfileTweets, fetchNonReplyProfileTweets} from '../../actions/tweet_actions';



const mapStateToProps = (state) => ({
	profileUser: state.profileUser,
	tweets: state.tweets
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
	}
});

const FeedContainer = connect(mapStateToProps, mapDispatchToProps)(Feed);

export default FeedContainer;
