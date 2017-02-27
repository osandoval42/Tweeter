import {connect} from 'react-redux';
import App from './app';

const mapStateToProps = (state) => ({
	tweetingStatus: state.tweetingStatus
});

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;