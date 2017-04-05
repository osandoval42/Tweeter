import {connect} from 'react-redux';
import App from './app';

const mapStateToProps = (state) => ({
	tweetingStatus: state.tweetingStatus,
	tweetViewTweet: state.tweetView.tweet,
	sessionPopupStatus: state.sessionPopup.showSessionPopup
});

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;