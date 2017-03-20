import {connect} from 'react-redux';
import TweetView from './tweet_view';
import {closeTweetView} from '../../actions/tweet_actions';


const mapStateToProps = (state) => ({
	tweet: state.tweetView.tweet
});

const mapDispatchToProps = (dispatch) => ({ 
	closeTheTweetView: () => {
		return dispatch(closeTweetView());
	}
});

const TweetViewContainer = connect(mapStateToProps, mapDispatchToProps)(TweetView);

export default TweetViewContainer;
