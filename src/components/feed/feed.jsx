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
		return (retweeter) ? (<span id="retweeter-name">{`@${retweeter} Retweeted`}</span>) : undefined;
	}
	authorRepliedTo(tweet){
		const repliedTo = tweet.tweetRepliedTo;
		return repliedTo ? (<span>In reply to: {repliedTo.authorName}</span>) : undefined;
	}
	componentDidUpdate(prevProps){
		if (prevProps.feedType != this.props.feedType){
			this.fetchTweets()
		}
	}
	fullNameOfAuthor(tweet){
		let names = []
		if (tweet.firstName) {names.push(tweet.firstName)};
		if (tweet.lastName) {names.push(tweet.lastName)};
		return names.join(" ");
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
	likeButton(tweet){
		const currUser = this.props.currentUser
		if ((!tweet.likes) || currUser && tweet.likes.some((like) => { return (like.userId === currUser['_id'])})){
			return <a onClick={this.props.toggleLike.bind(this, tweet['_id'])}>unlike</a>
		} else {
			return <a onClick={this.props.toggleLike.bind(this, tweet['_id'])}>like</a>
		}
	}
	getCount(tweet, type){
		if (!tweet[type] || tweet[type].length < 1){
			return undefined;
		} else {
			return tweet[type].length;
		}
	}
	render(){
		const tweets = this.props.tweets;
		return (
					<ul id="feed">
						{   tweets.map((tweet) => {
							const tweetId = tweet['_id']
							return (
								<li className="tweet relative clearfix" key={tweetId}>
										{this.retweeter(tweet)}
										<div id="tweet-img-container" className="clearfix">
											<img id="tweet-img" src="https://pbs.twimg.com/profile_images/578979277611274241/CgGnz4F-_400x400.png"/>
										</div>
										<h3 id="tweet-authorname">{this.fullNameOfAuthor(tweet)}</h3>
										<span id="tweet-username">{`@${tweet.authorName}`}</span>
										<span id="tweet-time">&nbsp;{tweet.tweetTime}</span>
										{this.authorRepliedTo(tweet)}
										<br/>
										<span id="tweet-content">{tweet.content}</span>
										<br/>
										<div className="tweet-buttons">
											<span className="tweet-inter-btn"><a onClick={this.props.openReplyingInterface.bind(this, tweet)}>reply</a> {this.getCount(tweet, "replies")}</span>
											<span className="tweet-inter-btn">{this.retweetButton(tweet)} {this.getCount(tweet, "retweets")}</span>
											<span className="tweet-inter-btn">{this.likeButton(tweet)} {this.getCount(tweet, "likes")}</span>
										</div>
								</li>);
						})}
					</ul>
		)
	}
};

module.exports = Feed;