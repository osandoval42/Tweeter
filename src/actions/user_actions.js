import * as APIUtil from '../util/user_api_util';
import Constants from '../constants/constants';

const resetProfileUser = () => ({
	type: Constants.RESET_PROFILE_USER
})


export const receiveProfileUser = profileUser => ({
	type: Constants.RECEIVE_PROFILE_USER,
	profileUser
});


export const fetchProfileUser = (username) => dispatch => {
	dispatch(resetProfileUser())
	APIUtil.fetchProfileUser(username)
		.then(user => dispatch(receiveProfileUser(user))), 
		err => dispatch(receiveErrors(err.responseJSON))
};

