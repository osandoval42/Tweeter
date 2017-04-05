import {connect} from 'react-redux';
import SignUp from './signup';
import {signup} from '../../actions/session_actions';

const mapDispatchToProps = (dispatch) => ({
	signup: (user) => {
		dispatch(signup(user))
	}
});

const SignUpContainer = connect(null, mapDispatchToProps)(SignUp);

export default SignUpContainer;