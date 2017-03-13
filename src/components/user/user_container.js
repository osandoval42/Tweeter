import {connect} from 'react-redux';
import User from './user';
import {toggleFollow} from '../../actions/user_actions';

const mapStateToProps = (state) => ({
	currUser: state.session.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
	toggleFollow: (followedUserId) => {
		return dispatch(toggleFollow(followedUserId))
	}
});

const UserContainer = connect(mapStateToProps, mapDispatchToProps)(User);

export default UserContainer;
