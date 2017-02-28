import {connect} from 'react-redux';
import TweetingInterface from './tweeting_interface';
import {closeTweetingInterface, postTweet, replyTweet} from '../../actions/tweet_actions';


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
	postTweet: (tweet) => {
		return dispatch(postTweet(tweet));
	},
	postReply: (originalTweet, replyContent) => {
		return dispatch(replyTweet(originalTweet, replyContent))
	}
});


const TweetingInterfaceContainer = connect(mapStateToProps, mapDispatchToProps)(TweetingInterface);

export default TweetingInterfaceContainer;