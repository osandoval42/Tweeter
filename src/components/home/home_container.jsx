import {connect} from 'react-redux';
import Home from './home';

const mapStateToProps = (state) => ({
	currentUser: state.session.currentUser
});

const HomeContainer = connect(mapStateToProps)(Home);

export default HomeContainer;