import React from 'react';
import Constants from '../../constants/constants';
import * as TweetActions from '../../actions/tweet_actions';
import Tweet from '../tweet/tweet_container';


class Feed extends React.Component { 
	constructor(props) {
		super(props);
		this.fetchTweets();
		this.feedListener = setInterval(this.fetchMoreTweetsIfAtBottomOfScroll.bind(this), 2000);
		this.oldScrollHeight = 0;
	}
	componentWillUnmount(){
		clearInterval(this.feedListener)
	}
	fetchTweets(lastTweetFetchedId){
		const profileUser = this.props.profileUser;
		let profileUserId;
		if (profileUser){
			profileUserId = profileUser['_id'];
		}
		switch (this.props.feedType){
			case Constants.LIKES_FEED:{
				if (profileUserId){
					this.props.getLikedTweets(profileUserId, lastTweetFetchedId);
				} else {
					TweetActions.resetTweets();
				}
				break;}
			case Constants.CURR_USER_FEED:{
				this.props.getCurrUserFeedTweets(lastTweetFetchedId);
				break;}
			case Constants.PROFILE_FEED:{
				if (profileUserId){
					this.props.getAllProfileTweets(profileUserId, lastTweetFetchedId);	
				} else {
					TweetActions.resetTweets();
				}
				break;}
			case Constants.NON_REPLY_PROFILE_FEED:{
				if (profileUserId){
					this.props.getNonReplyProfileTweets(profileUserId, lastTweetFetchedId);
				} else {
					TweetActions.resetTweets();
				}
			break;}
			default:{
				break;
			}
		}
	}
	componentDidUpdate(prevProps){
		if ((prevProps.feedType != this.props.feedType) ||
			prevProps.profileUser != this.props.profileUser){
			this.fetchTweets()
		}
	}
	hideUserBoxesOfTweet(tweetId){
		const tweetEl = document.getElementById(tweetId);
		let userboxes = [];
		userboxes.push(tweetEl.getElementsByClassName("user-photo-hover")[0]);
		userboxes.push(tweetEl.getElementsByClassName("username-hover")[0]);
		userboxes.push(tweetEl.getElementsByClassName("fullname-hover")[0]);
		userboxes.forEach((userBox) => {
			userBox.style.display = "none";
		})
	}
	hideUserBoxesOfOtherTweets(tweetWithUserBoxDisplayedId){
		const tweets = this.props.tweets;
		tweets.forEach((tweetId) => {
			if (tweetId !== tweetWithUserBoxDisplayedId){
				this.hideUserBoxesOfTweet(tweetId);
			}
		})
	}
	fetchMoreTweetsIfAtBottomOfScroll(){
		const feed = document.getElementsByClassName('feed')[0];
		const scrollTop = feed.scrollTop;
		const scrollHeight = feed.scrollHeight;
		const windowHeight = feed.clientHeight;
		const scrollOffset = 10;
		if ((scrollTop >= (scrollHeight - (windowHeight + scrollOffset))) && 
			scrollHeight > this.oldScrollHeight){
			this.oldScrollHeight = scrollHeight;
			const tweets = document.getElementById('feed-content');
			const lastTweetFetched = tweets.lastChild;
			if (lastTweetFetched){
				const lastTweetFetchedId = lastTweetFetched.id;
				this.fetchTweets(lastTweetFetchedId);
			}
		}
	}
	render(){
		const tweets = this.props.tweets;
		let nonHomeFeed = this.props.isOnHomePage ? "" : " non-home-feed";
		return (
					<div className={`feed${nonHomeFeed}`}>
						<ul id="feed-content">
						{   tweets.map((tweet) => {
							const tweetId = tweet['_id']
							return (<Tweet key={tweetId} hideUserBoxesOfOtherTweets={this.hideUserBoxesOfOtherTweets.bind(this)} tweet={tweet}/>);
						})}
						</ul>
					</div>
		)
	}
};

module.exports = Feed;