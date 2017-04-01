import React from 'react';
import Constants from '../../constants/constants';
import * as TweetActions from '../../actions/tweet_actions';
import Tweet from '../tweet/tweet_container';
import Spinner from '../../util/spin.js'


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
		// console.log(new Date().getTime());
		const tweetViewTweet = this.props.tweetViewTweet
		if (tweetViewTweet){
			return this.props.fetchReplies(tweetViewTweet['_id'], lastTweetFetchedId);
		}
		const profileUser = this.props.profileUser;
		const hashtagName = this.props.hashtagName
		let profileUserId;
		if (profileUser){
			profileUserId = profileUser['_id'];
		}
		switch (this.props.feedType){
			case Constants.HASHTAG_FEED: {
				this.props.fetchHashtagTweets(hashtagName, lastTweetFetchedId);
				break;
			}
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
		const afterRenderTime = new Date().getTime();
		console.log(`after render time: ${afterRenderTime}`)
		if ((prevProps.feedType != this.props.feedType) ||
			prevProps.profileUser != this.props.profileUser ||
			prevProps.currUser != this.props.currUser ||
			prevProps.hashtagName != this.props.hashtagName){
			this.fetchTweets()
		} 
	}
	hideUserBoxesOfTweet(tweetId){
		const tweetEl = document.getElementById(tweetId);
		if (tweetEl.className === 'tweet relative clearfix has-hover-boxes'){
			let userboxes = [];
			userboxes.push(tweetEl.getElementsByClassName("user-photo-hover")[0]);
			userboxes.push(tweetEl.getElementsByClassName("username-hover")[0]);
			userboxes.push(tweetEl.getElementsByClassName("fullname-hover")[0]);
			userboxes.forEach((userBox) => {
				userBox.style.display = "none";
			})
		}
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
			this.showLoading();
			this.oldScrollHeight = scrollHeight;
			const tweets = document.getElementById('feed-content');
			const lastTweetFetched = tweets.lastChild;
			if (lastTweetFetched){
				const lastTweetFetchedId = lastTweetFetched.id;
				this.fetchTweets(lastTweetFetchedId);
			}
		}
	}
	showLoading(){
		if (this.clearLoading){
			clearTimeout(this.clearLoading);
		}
		var target = document.getElementById('loading-more-tweets');
		target.style.display = "block";
		if (!this.spinner){
			this.startSpinner(target);
		}
		this.clearLoading = setTimeout(()=> {
			target.style.display = ""
		}, 1500)
	}
	startSpinner(target){
			var opts = {
			  lines: 13 // The number of lines to draw
			, length: 28 // The length of each line
			, width: 14 // The line thickness
			, radius: 42 // The radius of the inner circle
			, scale: 0.1 // Scales overall size of the spinner
			, corners: 1 // Corner roundness (0..1)
			, color: '#000' // #rgb or #rrggbb or array of colors
			, opacity: 0.25 // Opacity of the lines
			, rotate: 0 // The rotation offset
			, direction: 1 // 1: clockwise, -1: counterclockwise
			, speed: 1 // Rounds per second
			, trail: 60 // Afterglow percentage
			, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
			, zIndex: 2e9 // The z-index (defaults to 2000000000)
			, className: 'spinner' // The CSS class to assign to the spinner
			, top: '50%' // Top position relative to parent
			, left: '50%' // Left position relative to parent
			, shadow: false // Whether to render a shadow
			, hwaccel: false // Whether to use hardware acceleration
			, position: 'absolute' // Element positioning
			}
			this.spinner = new Spinner(opts).spin(target);
	}
	render(){
		// const beforeRenderTime = new Date().getTime();
		// console.log(`before render time: ${beforeRenderTime}`)
		const tweets = this.props.tweetViewTweet ? this.props.replies : this.props.tweets;
		let nonHomeFeed = this.props.tweetViewTweet || this.props.isOnHomePage ? "" : " non-home-feed";
		let tweetViewFeed = this.props.tweetViewTweet ? " tweet-view-feed" : "";
		if (this.props.isReply){
			tweetViewFeed += "-with-reply"
		}
		const loadingMoreTweets = <div id="loading-more-tweets"></div>;
		return (
					<div id="feed-container">
					<div className={`feed${nonHomeFeed}${tweetViewFeed}`}>
						<ul id="feed-content">
						{   tweets.map((tweet) => {
							const tweetId = tweet['_id']
							return (<Tweet key={tweetId} params={this.props.params} hideUserBoxesOfOtherTweets={this.hideUserBoxesOfOtherTweets.bind(this)} tweet={tweet}/>);
						})}
						</ul>
					</div>
					{loadingMoreTweets}
					</div>
		)
	}
};

module.exports = Feed;