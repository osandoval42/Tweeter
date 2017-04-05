import {connect} from 'react-redux';
import Follow from './follow';
import {fetchFollowers, fetchUsersBeingFollowed} from '../../actions/user_actions';



const mapStateToProps = (state) => ({
	currUser: state.session.currentUser,
	profileUser: state.profileUser,
	users: state.users
});

const mapDispatchToProps = (dispatch) => ({
	getFollowers: (userId) => {
		return dispatch(fetchFollowers(userId));
	},
	getUsersBeingFollowed: (userId) => {
		return dispatch(fetchUsersBeingFollowed(userId));
	}
});

const FollowContainer = connect(mapStateToProps, mapDispatchToProps)(Follow);

export default FollowContainer;
