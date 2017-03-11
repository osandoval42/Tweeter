import {connect} from 'react-redux';
import Feed from './feed';
import {fetchTweetsUserLikes, fetchAllTweets, fetchAllUserProfileTweets, fetchNonReplyProfileTweets} from '../../actions/tweet_actions';



const mapStateToProps = (state) => ({
	profileUser: state.profileUser,
	tweets: state.tweets
});

const mapDispatchToProps = (dispatch) => ({ //REVISE check that currUserId is needed for all functions
	getCurrUserFeedTweets: () => {
		return dispatch(fetchAllTweets());
	},
	getNonReplyProfileTweets: (currUserId) => {
		return dispatch(fetchNonReplyProfileTweets(currUserId));
	},
	getAllProfileTweets: (currUserId) => {
		return dispatch(fetchAllUserProfileTweets(currUserId));
	},
	getLikedTweets: (currUserId) => {
		return dispatch(fetchTweetsUserLikes(currUserId))
	}
});

const FeedContainer = connect(mapStateToProps, mapDispatchToProps)(Feed);

export default FeedContainer;
