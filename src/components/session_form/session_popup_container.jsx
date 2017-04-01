import {connect} from 'react-redux';
import SessionPopup from './session_popup';
import {closeSessionPopup} from '../../actions/session_actions';


const mapStateToProps = (state) => ({
	currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
	closeSessionPopup: () => {
		return dispatch(closeSessionPopup());
	}
});


const SessionPopupContainer = connect(mapStateToProps, mapDispatchToProps)(SessionPopup);

export default SessionPopupContainer;