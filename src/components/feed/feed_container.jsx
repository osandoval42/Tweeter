import {connect} from 'react-redux';
import Feed from './feed';
import {openReplyingInterface, deleteRetweet, postRetweet, fetchTweetsUserLikes, fetchAllTweets, fetchAllUserProfileTweets, fetchNonReplyProfileTweets} from '../../actions/tweet_actions';


const mapStateToProps = (state) => ({
	currentUser: state.session.currentUser,
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
	},
	retweet: (originalTweetId) => {
		return dispatch(postRetweet(originalTweetId));
	},
	unretweet: (retweetId) => {
		return dispatch(deleteRetweet(retweetId));
	},
	openReplyingInterface(originalTweet){
		return dispatch(openReplyingInterface(originalTweet));
	}
});

const FeedContainer = connect(mapStateToProps, mapDispatchToProps)(Feed);

export default FeedContainer;
