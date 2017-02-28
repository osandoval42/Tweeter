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
	retweetButton(tweet){
		const tweetId = tweet['_id'];
		const currUser = this.props.currentUser
		const retweetButton = <a onClick={this.props.retweet.bind(this, tweetId)}>retweet</a>
		let retweetId;
		const retweets = tweet.retweets;
		if (currUser){
			if (retweets && retweets.some((retweet) => {
				const bool =(retweet.authorId === currUser['_id'])
				if (bool) {retweetId = retweet['_id']}
				return bool;
			})){
				return (<a onClick={this.props.unretweet.bind(this, retweetId)}>unretweet</a>)
			} else {
				return retweetButton
			}
			//return retweetButton if has not retweeted
			//else return unretweetButton
		} else {
			return retweetButton;
		}
	}
	render(){
		const tweets = this.props.tweets;
		return (
				<div>
					<ul>
						{   tweets.map((tweet) => {
							const retweetCount = tweet.retweets ? tweet.retweets.length : 0;
							const likesCount = tweet.likes ? tweet.likes.length : 0;
							const tweetId = tweet['_id']
							return (
								<li key={tweetId}>
									<ul>
										{this.retweeter(tweet)}
										{this.authorRepliedTo(tweet)}
										<li>content: {tweet.content}</li>
										<li>created: {tweet.createdAt}</li>
										<li>original author: {tweet.authorName}</li>
										<li><a onClick={this.props.openReplyingInterface.bind(this, tweet)}>reply</a> replies: {tweet.replyCount}</li>
										<li>{this.retweetButton(tweet)} retweets: {retweetCount}</li>
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