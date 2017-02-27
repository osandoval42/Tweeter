import React from 'react';
import Constants from '../../constants/constants';
import * as TweetActions from '../../actions/tweet_actions';


class Feed extends React.Component { 
	constructor(props) {
		super(props);
		this.fetchTweets();
	}
	fetchTweets(){
		const profileUser = this.props.profileUser;
		let profileUserId;
		if (profileUser){
			profileUserId = profileUser['_id'];
		}
		switch (this.props.feedType){
			case Constants.LIKES_FEED:{
				if (profileUserId){
					this.props.getLikedTweets(profileUserId);
				} else {
					TweetActions.resetTweets();
				}
				break;}
			case Constants.CURR_USER_FEED:{
				this.props.getCurrUserFeedTweets();
				break;}
			case Constants.PROFILE_FEED:{
				if (profileUserId){
					this.props.getAllProfileTweets(profileUserId);	
				} else {
					TweetActions.resetTweets();
				}
				break;}
			case Constants.NON_REPLY_PROFILE_FEED:{
				if (profileUserId){
					this.props.getNonReplyProfileTweets(profileUserId);
				} else {
					TweetActions.resetTweets();
				}
			break;}
			default:{
				break;
			}
		}
	}
	retweeter(tweet){
		const retweeter = tweet.retweetAuthorName;
		return (retweeter) ? (<li>Retweeted By: {retweeter}</li>) : undefined;
	}
	authorRepliedTo(tweet){
		const repliedTo = tweet.tweetRepliedTo;
		return repliedTo ? (<li>In reply to: {repliedTo.authorName}</li>) : undefined;
	}
	componentDidUpdate(prevProps){
		if (prevProps.feedType != this.props.feedType){
			this.fetchTweets()
		}
	}
	render(){
		const tweets = this.props.tweets;
		const originalTweetIds = Object.keys(tweets);
		return (
				<div>
					<ul>
						{   originalTweetIds.map((originalTweetId) => {
							const tweet = tweets[originalTweetId];
							const retweetCount = tweet.retweets ? tweet.retweets.length : 0;
							const likesCount = tweet.likes ? tweet.likes.length : 0;
							return (
								<li key={originalTweetId}>
									<ul>
										{this.retweeter(tweet)}
										{this.authorRepliedTo(tweet)}
										<li>content: {tweet.content}</li>
										<li>created: {tweet.createdAt}</li>
										<li>original author: {tweet.authorName}</li>
										<li>replies: {tweet.replyCount}</li>
										<li>retweets: {retweetCount}</li>
										<li>likes: {likesCount}</li>
									</ul>
								</li>);
						})}
					</ul>
				</div>
		)
	}
};

module.exports = Feed;