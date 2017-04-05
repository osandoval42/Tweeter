import {connect} from 'react-redux';
import TweetingInterface from './tweeting_interface';
import {closeTweetingInterface, postTweet, replyTweet} from '../../actions/tweet_actions';


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
	postTweet: (tweet, isOnHomePage) => {
		return dispatch(postTweet(tweet, isOnHomePage));
	},
	postReply: (originalTweet, replyContent) => {
		return dispatch(replyTweet(originalTweet, replyContent))
	},
	closeTweetingInterface: () => {
		return dispatch(closeTweetingInterface());
	}
});


const TweetingInterfaceContainer = connect(mapStateToProps, mapDispatchToProps)(TweetingInterface);

export default TweetingInterfaceContainer;