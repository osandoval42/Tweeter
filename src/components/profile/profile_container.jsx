import {connect} from 'react-redux';
import Profile from './profile';
import {fetchProfileUser, uploadProfileImg, uploadCoverImg} from '../../actions/user_actions';
import {openTweetingInterface, resetTweets} from '../../actions/tweet_actions';
import {openSessionPopup} from '../../actions/session_actions';

const mapStateToProps = (state) => ({
	profileUser: state.profileUser,
	currUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
	getProfileUser: (username) => {
		return dispatch(fetchProfileUser(username));
	},
	openTweetingInterface(initialContent, fullNameTo){
		return dispatch(openTweetingInterface(initialContent, fullNameTo));
	},
	uploadProfileImg: (profileImg) => {
		return dispatch(uploadProfileImg(profileImg))
	},
	uploadCoverImg: (coverImg) => {
		return dispatch(uploadCoverImg(coverImg))
	},
	openSessionPopup: () => {
		return dispatch(openSessionPopup())
	},
	resetTweets: () => {
		return dispatch(resetTweets())
	}
});

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default ProfileContainer;