import {connect} from 'react-redux';
import Navbar from './navbar';
import {openTweetingInterface} from '../../actions/tweet_actions'

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
	openTweetingInterface(){
		return dispatch(openTweetingInterface())
	}
});

const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default NavbarContainer;