import {connect} from 'react-redux';
import Panel from './panel';
import {toggleFollow} from '../../actions/user_actions'; //CHANGE



const mapStateToProps = (state) => ({
	profileUser: state.profileUser,
	currUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
	toggleFollow: (followedUserId) => {
		return dispatch(toggleFollow(followedUserId));
	}
});

const PanelContainer = connect(mapStateToProps, mapDispatchToProps)(Panel);

export default PanelContainer;
