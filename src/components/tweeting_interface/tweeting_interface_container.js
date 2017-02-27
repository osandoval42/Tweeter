import {connect} from 'react-redux';
import TweetingInterface from './tweeting_interface';
import {closeTweetingInterface} from '../../actions/tweet_actions';


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
	closeTweetingInterface: () => {
		return dispatch(closeTweetingInterface());
	}
});


const TweetingInterfaceContainer = connect(mapStateToProps, mapDispatchToProps)(TweetingInterface);

export default TweetingInterfaceContainer;