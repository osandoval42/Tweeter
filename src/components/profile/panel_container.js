import {connect} from 'react-redux';
import Panel from './panel';
import {toggleFollow} from '../../actions/user_actions'; //CHANGE
import {openSessionPopup} from '../../actions/session_actions';



const mapStateToProps = (state) => ({
	profileUser: state.profileUser,
	currUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
	toggleFollow: (followedUserId) => {
		return dispatch(toggleFollow(followedUserId));
	},
	openSessionPopup: () => {
		return dispatch(openSessionPopup());
	}
});

const PanelContainer = connect(mapStateToProps, mapDispatchToProps)(Panel);

export default PanelContainer;
