import {connect} from 'react-redux';
import ProfileBox from './profile_box';

const mapStateToProps = (state) => ({
	currentUser: state.session.currentUser
});



const ProfileBoxContainer = connect(mapStateToProps)(ProfileBox);

export default ProfileBoxContainer;