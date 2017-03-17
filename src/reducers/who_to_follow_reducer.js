import {
	RECEIVE_WHO_TO_FOLLOW,
	REMOVE_NEW_FOLLOWED_USER
} from '../constants/constants';

import merge from 'lodash/merge';

const whoToFollow = [];

const WhoToFollowReducer = (state = whoToFollow, action) => {
	switch(action.type){
		case RECEIVE_WHO_TO_FOLLOW:
			return action.whoToFollow;
		case REMOVE_NEW_FOLLOWED_USER:
			const stateDup = state.map((user) => {
				return (merge({}, user));
			})
			return stateDup.filter((user) => {
				return (action.newFollowedUser['_id'] !== user['_id']);
			})
		default:
			return state;
	}
};

export default WhoToFollowReducer;