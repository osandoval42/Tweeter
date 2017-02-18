import {connect} from 'react-redux';
import Feed from './feed';
import {fetchAllTweets} from '../../actions/tweet_actions';
import thunk from 'redux-thunk';


const mapStateToProps = (state) => ({
	tweets: state.tweets
});

const mapDispatchToProps = (dispatch) => ({
	getTweets: (currUserId) => {
		return dispatch(fetchAllTweets(currUserId));
	}
});

const FeedContainer = connect(mapStateToProps, mapDispatchToProps)(Feed);

export default FeedContainer;