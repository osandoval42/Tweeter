import {connect} from 'react-redux';
import ProfileBox from './profile_box';
import {logout} from '../../actions/session_actions';

const mapStateToProps = (state) => ({
	currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
	logout: () => {
		dispatch(logout())
	}
});

const ProfileBoxContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileBox);

export default ProfileBoxContainer;