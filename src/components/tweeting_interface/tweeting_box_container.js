import {connect} from 'react-redux';
import TweetingBox from './tweeting_box';
import {closeTweetingInterface} from '../../actions/tweet_actions';


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
	closeTweetingInterface: () => {
		return dispatch(closeTweetingInterface());
	},

});


const TweetingBoxContainer = connect(mapStateToProps, mapDispatchToProps)(TweetingBox);

export default TweetingBoxContainer;