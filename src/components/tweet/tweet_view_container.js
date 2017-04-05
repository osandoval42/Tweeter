import {connect} from 'react-redux';
import TweetView from './tweet_view';
import {resetLikePictures, closeTweetView, getLikePicturesForTweet, getLikePicturesForTweetRepliedTo} from '../../actions/tweet_actions';
import {toggleFollow} from '../../actions/user_actions';
import {openSessionPopup} from '../../actions/session_actions';


const mapStateToProps = (state) => ({
	tweet: state.tweetView.tweet,
	reply: state.tweetView.reply,
	currUser: state.session.currentUser,
	tweetPictures: state.likePictures.tweet,
	replyPictures: state.likePictures.reply
});

const mapDispatchToProps = (dispatch) => ({ 
	closeTheTweetView: () => {
		return dispatch(closeTweetView());
	},
	toggleFollow: (followedUserId) => {
		return dispatch(toggleFollow(followedUserId))
	},
	fetchTweetLikePictures: (tweet) => {
		dispatch(resetLikePictures)
		const likes = tweet.likes;
		const body = {likes}
		dispatch(getLikePicturesForTweet(body));
	},
	fetchReplyLikePictures: (tweetRepliedTo) => {
		const likes = tweetRepliedTo.likes;
		const body = {likes}
		dispatch(getLikePicturesForTweetRepliedTo(body));
	},
	openSessionPopup: () => {
		return dispatch(openSessionPopup());
	}
});

const TweetViewContainer = connect(mapStateToProps, mapDispatchToProps)(TweetView);

export default TweetViewContainer;
