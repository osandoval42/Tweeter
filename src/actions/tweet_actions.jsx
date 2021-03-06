import * as APIUtil from '../util/tweet_api_util';
import Constants from '../constants/constants';
import thunk from 'redux-thunk';

//REVISE ADD LAST ID
export const resetTweets = () => ({
	type: Constants.RESET_TWEETS
})

export const resetReplies = () => ({
	type: Constants.RESET_REPLIES
})

export const resetLikePictures = () => ({
	type: Constants.RESET_LIKE_PICTURES
})

export const openTweetingInterface = (initialContent, fullNameTo) => {
	return {
	type: Constants.WRITING_TWEET,
	initialContent,
	fullNameTo
	};	
}

export const openReplyingInterface = (originalTweet) => {
	return {
	type: Constants.WRITING_REPLY,
	originalTweet
	};	
}

export const postRetweet = (originalTweetId) => dispatch => {
		APIUtil.postRetweet(originalTweetId)
		.then(revisedOriginalTweet => {
			dispatch(receiveUpdatedTweet(revisedOriginalTweet))}), 
		err => dispatch(receiveErrors(err.responseJSON))
}


export const deleteRetweet = (retweetId) => dispatch =>{
		APIUtil.deleteRetweet(retweetId)
		.then(revisedOriginalTweet => {
			dispatch(receiveUpdatedTweet(revisedOriginalTweet))}), 
		err => dispatch(receiveErrors(err.responseJSON))
}

export const closeTweetingInterface = () => {
	return {
	type: Constants.NOT_WRITING_TWEET,
	};	
}

export const getTweetRepliedTo = (tweetId) => dispatch => {
		APIUtil.getTweet(tweetId)
		.then(tweetRepliedTo => {
			dispatch(receiveTweetRepliedTo(tweetRepliedTo))}), 
		err => dispatch(receiveErrors(err.responseJSON))
}

export const closeTweetView = () => {
	return {
	type: Constants.NO_TWEET_VIEW,
	};	
}
export const openTweetView = (tweet) => {
	return {
	type: Constants.YES_TWEET_VIEW,
	tweet
	};	
}
export const receiveTweetRepliedTo = (tweetRepliedTo) => {
	return {
	type: Constants.YES_TWEET_VIEW_REPLY,
	reply: tweetRepliedTo
	};	
}

export const postTweet = (newTweet, isOnHomePage) => dispatch => {
	APIUtil.postTweet(newTweet)
		.then(newTweet => {
			dispatch(receiveNewTweet(newTweet, isOnHomePage))}), 
		err => dispatch(receiveErrors(err.responseJSON))
};

export const replyTweet = (originalTweet, replyContent) => dispatch => {
	APIUtil.replyTweet(originalTweet, replyContent)
		.then(updatedOriginalTweet => {
			dispatch(receiveUpdatedTweet(updatedOriginalTweet))}), 
		err => dispatch(receiveErrors(err.responseJSON))
};

export const fetchAllTweets = (lastTweetFetchedId) => dispatch => {
	if (!lastTweetFetchedId){
		dispatch(resetTweets())	
	}
	APIUtil.fetchAllTweets(lastTweetFetchedId)
		.then((tweets) => {
			dispatch(receiveTweets(tweets));
		}), 
		err => dispatch(receiveErrors(err.responseJSON))
};

export const getHashtagTweets = (hashtagName, lastTweetFetchedId) => dispatch => {
	if (!lastTweetFetchedId){
		dispatch(resetTweets())	
	}
	APIUtil.fetchHashtagTweets(hashtagName, lastTweetFetchedId)
		.then((tweets) => {
			dispatch(receiveTweets(tweets));
		}), 
		err => dispatch(receiveErrors(err.responseJSON))
};


export const fetchNonReplyProfileTweets = (currUserId, lastTweetFetchedId) => dispatch => {
	if (!lastTweetFetchedId){
		dispatch(resetTweets())	
	}
	APIUtil.fetchNonReplyProfileTweets(currUserId, lastTweetFetchedId)
		.then((tweets) => {
			dispatch(receiveTweets(tweets))}), 
		err => dispatch(receiveErrors(err.responseJSON))
};

export const fetchAllUserProfileTweets = (currUserId, lastTweetFetchedId) => dispatch => {
	if (!lastTweetFetchedId){
		dispatch(resetTweets())	
	}
	APIUtil.fetchAllUserProfileTweets(currUserId, lastTweetFetchedId)
		.then((tweets) => {
			dispatch(receiveTweets(tweets))}), 
		err => dispatch(receiveErrors(err.responseJSON))
};

export const receiveTweets = (tweetObj) => { 
	return {
	type: Constants.RECEIVE_TWEETS,
	tweetObj
}};

export const receiveReplies = tweetObj => ({
	type: Constants.RECEIVE_REPLIES,
	tweetObj
});

export const fetchTweetsUserLikes = (likerId, lastTweetFetchedId) => dispatch => {
	if (!lastTweetFetchedId){
		dispatch(resetTweets())	
	}
	APIUtil.fetchTweetsUserLikes(likerId, lastTweetFetchedId)
		.then(tweets => dispatch(receiveTweets(tweets))), 
		err => dispatch(receiveErrors(err.responseJSON))
};

export const receiveNewTweet = (tweet, isOnHomePage) => ({
	type: Constants.RECEIVE_NEW_TWEET,
	tweet,
	isOnHomePage
});

export const receiveUpdatedTweet = tweet => ({
	type: Constants.RECEIVE_UPDATED_TWEET,
	tweet
});

export const receiveErrors = errors => ({
  type: Constants.RECEIVE_ERRORS,
  errors
});



export const getTweetReplies = (tweetId, lastTweetFetchedId) => dispatch => { //UPDATE
	if (!lastTweetFetchedId){
		dispatch(resetReplies())	
	}
	APIUtil.fetchReplies(tweetId, lastTweetFetchedId)
		.then(replies => dispatch(receiveReplies(replies))), 
		err => dispatch(receiveErrors(err.responseJSON))
};

export const getLikePicturesForTweetRepliedTo = (body) => dispatch => { //UPDATE
	APIUtil.getLikePictures(body)
		.then(pics => dispatch(receiveTweetRepliedToLikePictures(pics))), 
		err => dispatch(receiveErrors(err.responseJSON))
};


export const getLikePicturesForTweet = (body) => dispatch => { //UPDATE
	APIUtil.getLikePictures(body)
		.then(pics => 
			dispatch(receiveTweetLikePictures(pics))), 
		err => dispatch(receiveErrors(err.responseJSON))
};

export const receiveTweetLikePictures = pictures => {
return {
	type: Constants.TWEET_LIKE_PICTURES,
	pictures
}};

export const receiveTweetRepliedToLikePictures = pictures => ({
	type: Constants.TWEET_REPLIED_TO_LIKE_PICTURES,
	pictures
});


export const getTrendingHashtags = () => dispatch => {
	APIUtil.getTrendingHashtags()
		.then(hashtagObjs => 
			dispatch(receiveTrendingHashtags(hashtagObjs))), 
		err => dispatch(receiveErrors(err.responseJSON))
};

export const receiveTrendingHashtags = (hashtagObjs) => {
	return ({
		type: Constants.TRENDING_HASHTAGS,
		hashtagObjs
	})
}



