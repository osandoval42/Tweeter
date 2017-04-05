import {connect} from 'react-redux';
import LogIn from './login';
import {login} from '../../actions/session_actions';

const mapDispatchToProps = (dispatch) => ({
	login: (user) => {
		dispatch(login(user))
	}
});

const LoginContainer = connect(null, mapDispatchToProps)(LogIn);

export default LoginContainer;