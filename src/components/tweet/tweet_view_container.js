import {connect} from 'react-redux';
import TweetView from './tweet_view';
import {closeTweetView} from '../../actions/tweet_actions';


const mapStateToProps = (state) => ({
	tweet: state.tweetView.tweet,
	reply: state.tweetView.reply,
	currUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({ 
	closeTheTweetView: () => {
		return dispatch(closeTweetView());
	},
	toggleFollow: (followedUserId) => {
		return dispatch(toggleFollow(followedUserId))
	}
});

const TweetViewContainer = connect(mapStateToProps, mapDispatchToProps)(TweetView);

export default TweetViewContainer;
