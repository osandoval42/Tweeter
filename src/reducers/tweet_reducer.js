import {
	RECEIVE_TWEETS
} from '../constants/constants';


const tweets = [];

const TweetReducer = (state = tweets, action) => {
	switch(action.type){
		case RECEIVE_TWEETS:
			return action.tweets;
		default:
			return state;
	}
};

export default TweetReducer;