import {
	RECEIVE_PROFILE_USER,
	RESET_PROFILE_USER
} from '../constants/constants';

const profileUser = {};

const ProfileUserReducer = (state = profileUser, action) => {
	switch(action.type){
		case RECEIVE_PROFILE_USER:
			return action.profileUser;
		case RESET_PROFILE_USER:
			return state;
		default:
			return state;
	}
};

export default ProfileUserReducer;