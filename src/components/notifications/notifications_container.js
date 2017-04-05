import {connect} from 'react-redux';
import Notifications from './notifications';
import {clearNotifications} from '../../actions/user_actions';

const mapStateToProps = (state) => ({
	currentUser: state.session.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
	clearNotifications: () => {
		return dispatch(clearNotifications());
	}
});

const NotificationsContainer = connect(mapStateToProps, mapDispatchToProps)(Notifications);

export default NotificationsContainer;
