import React from 'react';
import Constants from '../../constants/constants';
import * as TweetActions from '../../actions/tweet_actions';
import Tweet from '../tweet/tweet_container';


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
	componentDidUpdate(prevProps){
		if ((prevProps.feedType != this.props.feedType) ||
			prevProps.profileUser != this.props.profileUser){
			this.fetchTweets()
		}
	}
	render(){
		const tweets = this.props.tweets;
		let nonHomeFeed = this.props.isOnHomePage ? "" : " non-home-feed";
		return (
					<ul className={`feed${nonHomeFeed}`}>
						{   tweets.map((tweet) => {
							const tweetId = tweet['_id']
							return (<Tweet key={tweetId} tweet={tweet}/>);
						})}
					</ul>
		)
	}
};

module.exports = Feed;