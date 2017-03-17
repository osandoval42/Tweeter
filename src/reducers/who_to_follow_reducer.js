import {
	RECEIVE_WHO_TO_FOLLOW
} from '../constants/constants';

const whoToFollow = [];

const WhoToFollowReducer = (state = whoToFollow, action) => {
	switch(action.type){
		case RECEIVE_WHO_TO_FOLLOW:
			return action.whoToFollow;
		default:
			return state;
	}
};

export default WhoToFollowReducer;