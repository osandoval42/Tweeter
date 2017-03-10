import {connect} from 'react-redux';
import Profile from './profile';
import {fetchProfileUser} from '../../actions/user_actions';
import {openTweetingInterface} from '../../actions/tweet_actions';

const mapStateToProps = (state) => ({
	profileUser: state.profileUser
});

const mapDispatchToProps = (dispatch) => ({
	getProfileUser: (username) => {
		return dispatch(fetchProfileUser(username));
	},
	openTweetingInterface(initialContent, fullNameTo){
		return dispatch(openTweetingInterface(initialContent, fullNameTo));
	}
});

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default ProfileContainer;