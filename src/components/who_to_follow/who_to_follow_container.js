import {connect} from 'react-redux';
import WhoToFollow from './who_to_follow';
import {getWhoToFollow} from '../../actions/user_actions'

const mapStateToProps = (state) => ({
	currentUser: state.session.currentUser,
	whoToFollow: state.whoToFollow
});

const mapDispatchToProps = (dispatch) => ({
	getWhoToFollow(){
		return dispatch(getWhoToFollow())
	}
});

const WhoToFollowContainer = connect(mapStateToProps, mapDispatchToProps)(WhoToFollow);

export default WhoToFollowContainer;