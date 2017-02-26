import {connect} from 'react-redux';
import Feed from './feed';
import {fetchAllTweets, fetchAllUserProfileTweets, fetchNonReplyProfileTweets} from '../../actions/tweet_actions';


const mapStateToProps = (state) => ({
	profileUser: state.profileUser,
	tweets: state.tweets
});

const mapDispatchToProps = (dispatch) => ({
	getCurrUserFeedTweets: () => {
		return dispatch(fetchAllTweets());
	},
	getNonReplyProfileTweets: (currUserId) => {
		return dispatch(fetchNonReplyProfileTweets(currUserId));
	},
	getAllProfileTweets: (currUserId) => {
		return dispatch(fetchAllUserProfileTweets(currUserId));
	}
});

const FeedContainer = connect(mapStateToProps, mapDispatchToProps)(Feed);

export default FeedContainer;
