import {connect} from 'react-redux';
import ProfileTweets from './profile_tweets';

const mapStateToProps = (state) => ({
	currUser: state.session.currentUser,
});

const ProfileTweetsContainer = connect(mapStateToProps)(ProfileTweets);

export default ProfileTweetsContainer;