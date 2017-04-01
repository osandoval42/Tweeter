import {connect} from 'react-redux';
import User from './user';
import {toggleFollow} from '../../actions/user_actions';
import {openSessionPopup} from '../../actions/session_actions';

const mapStateToProps = (state) => ({
	currUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
	toggleFollow: (followedUserId) => {
		return dispatch(toggleFollow(followedUserId))
	},
	openSessionPopup: ()=> {
		return dispatch(openSessionPopup());
	}
});

const UserContainer = connect(mapStateToProps, mapDispatchToProps)(User);

export default UserContainer;
