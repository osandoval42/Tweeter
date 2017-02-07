import {connect} from 'react-redux';
import Home from './home';
import {signup, login, logout} from '../../actions/session_actions';

const mapStateToProps = (state) => ({
	currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
	signin: (user) => {
		dispatch(login(user))
	},
	signup: (user) => {
		dispatch(signup(user))
	},
	signout: () => {
		dispatch(logout())
	}
});

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeContainer;
