import {connect} from 'react-redux';
import Feed from './feed';
import {fetchAllTweets, resetTweets} from '../../actions/tweet_actions';


const mapStateToProps = (state) => ({
	tweets: state.tweets,
});

const mapDispatchToProps = (dispatch) => ({
	getTweets: (currUserId) => {
		dispatch(resetTweets())
		return dispatch(fetchAllTweets(currUserId));
	}
});

const FeedContainer = connect(mapStateToProps, mapDispatchToProps)(Feed);

export default FeedContainer;