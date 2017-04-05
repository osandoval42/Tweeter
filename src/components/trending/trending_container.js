import {connect} from 'react-redux';
import Trending from './trending';
import {getTrendingHashtags} from '../../actions/tweet_actions';
import {logout} from '../../actions/session_actions';

const mapStateToProps = (state) => ({
	trending: state.trending
});

const mapDispatchToProps = (dispatch) => ({
	fetchTrending(){
		return dispatch(getTrendingHashtags())
	}
});

const TrendingContainer = connect(mapStateToProps, mapDispatchToProps)(Trending);

export default TrendingContainer;