import {
	WRITING_TWEET,
	NOT_WRITING_TWEET
} from '../constants/constants';

const notTweetingStatus = {isWriting: false};

const WritingTweetReducer = (state = notTweetingStatus, action) => {
	switch(action.type){
		case WRITING_TWEET:
			let tweetingStatus = {isWriting: true}
			tweetingStatus.initialContent = action.initialContent;
			return tweetingStatus;
		case NOT_WRITING_TWEET:
			return notTweetingStatus;
		default:
			return state;
	}
};

export default WritingTweetReducer;