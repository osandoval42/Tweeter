import {connect} from 'react-redux';
import {openTweetView, openReplyingInterface, deleteRetweet, postRetweet} from '../../actions/tweet_actions';
import Tweet from './tweet';
import {toggleLike} from '../../actions/like_actions';

const mapStateToProps = (state) => ({
	currentUser: state.session.currentUser,
});

const mapDispatchToProps = (dispatch) => ({ //REVISE check that currUserId is needed for all functions
	retweet: (originalTweetId) => {
		return dispatch(postRetweet(originalTweetId));
	},
	unretweet: (retweetId) => {
		return dispatch(deleteRetweet(retweetId));
	},
	openReplyingInterface(originalTweet){
		return dispatch(openReplyingInterface(originalTweet));
	},
	toggleLike(tweetId){
		return dispatch(toggleLike(tweetId));
	},
	openTheTweetView(tweet){
		return dispatch(openTweetView(tweet));
	}
});

const TweetContainer = connect(mapStateToProps, mapDispatchToProps)(Tweet);
export default TweetContainer;