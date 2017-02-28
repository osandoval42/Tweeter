import {connect} from 'react-redux';
import ReplyingBox from './replying_box';
import {closeTweetingInterface} from '../../actions/tweet_actions';


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
	closeTweetingInterface: () => {
		return dispatch(closeTweetingInterface());
	},

});


const ReplyingBoxContainer = connect(mapStateToProps, mapDispatchToProps)(ReplyingBox);

export default ReplyingBoxContainer;