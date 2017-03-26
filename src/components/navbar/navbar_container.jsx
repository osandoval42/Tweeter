import {connect} from 'react-redux';
import Navbar from './navbar';
import {openTweetingInterface} from '../../actions/tweet_actions';
import {logout} from '../../actions/session_actions';

const mapStateToProps = (state) => ({
	currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
	openTweetingInterface(){
		return dispatch(openTweetingInterface())
	},
	logout: () => {
		dispatch(logout())
	}
});

const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default NavbarContainer;