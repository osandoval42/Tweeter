import {
	WRITING_TWEET,
	WRITING_REPLY,
	NOT_WRITING_TWEET
} from '../constants/constants';

const notTweetingStatus = {isWriting: false};

const WritingTweetReducer = (state = notTweetingStatus, action) => {
	let tweetingStatus;
	switch(action.type){
		case WRITING_TWEET:
			tweetingStatus = {isWriting: true}
			tweetingStatus.initialContent = action.initialContent;
			tweetingStatus.fullNameTo = action.fullNameTo;
			return tweetingStatus;
		case WRITING_REPLY:
			tweetingStatus = {isWriting: true}
			tweetingStatus.tweetReplyingTo = action.originalTweet;
			return tweetingStatus;
		case NOT_WRITING_TWEET:
			return notTweetingStatus;
		default:
			return state;
	}
};

export default WritingTweetReducer;