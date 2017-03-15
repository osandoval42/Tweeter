import React from 'react';
import {browserHistory} from 'react-router';
import HoverUserBox from './hover_user_box';
import Constants from '../../constants/constants';

class Tweet extends React.Component{
	constructor(props) {
		super(props);
	}
	retweeter(){
		const retweeter = this.props.tweet.retweetAuthorName;
		return (retweeter) ? (<span id="retweeter-name">{`@${retweeter} Retweeted`}</span>) : undefined;
	}
	toUser(tweet){
		browserHistory.push(`/profile/${this.props.tweet.authorName}`);
	}
	fullNameOfAuthor(){
		let names = []
		const tweet = this.props.tweet;
		if (tweet.firstName) {names.push(tweet.firstName)};
		if (tweet.lastName) {names.push(tweet.lastName)};
		return names.join(" ");
	}
	authorRepliedTo(){
		const tweet = this.props.tweet;
		const repliedTo = tweet.tweetRepliedTo;
		return repliedTo ? (<span>In reply to: {repliedTo.authorName}</span>) : undefined;
	}
	getCount(type){
		const tweet = this.props.tweet;
		if (!tweet[type] || tweet[type].length < 1){
			return undefined;
		} else {
			return tweet[type].length;
		}
	}
	likeButton(){
		const tweet = this.props.tweet;
		const currUser = this.props.currentUser
		if ((!tweet.likes) || currUser && tweet.likes.some((like) => { return (like.userId === currUser['_id'])})){
			return <a onClick={this.props.toggleLike.bind(this, tweet['_id'])}>unlike {this.getCount("likes")}</a>
		} else {
			return <a onClick={this.props.toggleLike.bind(this, tweet['_id'])}>like {this.getCount("likes")}</a>
		}
	}
	retweetButton(){
		const tweet = this.props.tweet;
		const tweetId = tweet['_id'];
		const currUser = this.props.currentUser
		const retweetButton = <a onClick={this.props.retweet.bind(this, tweetId)}>retweet {this.getCount.call(this, "retweets")}</a>
		let retweetId;
		const retweets = tweet.retweets;
		if (currUser){
			if (retweets && retweets.some((retweet) => {
				const bool =(retweet.authorId === currUser['_id'])
				if (bool) {retweetId = retweet['_id']}
				return bool;
			})){
				return (<a onClick={this.props.unretweet.bind(this, retweetId)}>retweeted {this.getCount.call(this, "retweets")}</a>)
			} else {
				return retweetButton
			}
			//return retweetButton if has not retweeted
			//else return unretweetButton
		} else {
			return retweetButton;
		}
	}
	tweetButtons(){
		if (this.props.isReplying){
			return undefined;
		} else {
			const tweet = this.props.tweet;
			return (
				<div className="tweet-buttons">
					<span className="tweet-inter-btn"><a onClick={this.props.openReplyingInterface.bind(this, tweet)}>reply {tweet.replyCount == 0 ? "" : tweet.replyCount}</a></span>
					<span className="tweet-inter-btn">{this.retweetButton.call(this)}</span>
					<span className="tweet-inter-btn">{this.likeButton.call(this)}</span>
				</div>
			)
		}
	}
	hoverBox(type){
		const tweet = this.props.tweet;
		if (tweet.user){
			return (
					<HoverUserBox user={tweet.user} hoverOver={type} 
					stopUserBoxFromDisappearing={this.stopUserBoxFromDisappearing.bind(this, type)} 	
					immediatelyHideUserBox={this.immediatelyHideUserBox.bind(this, type)}/>
			)
		}
	}
	displayUserBox(type){
		this.stopUserBoxFromDisappearing(type);
		const tweetId = this.props.tweet['_id']
		const tweetEl = document.getElementById(tweetId);
		if (type !== Constants.USER_PHOTO){
			this.immediatelyHideUserBox(Constants.USER_PHOTO);
		}
		if (type !== Constants.USERNAME){
			this.immediatelyHideUserBox(Constants.USERNAME);
		}
		if (type !== Constants.FULLNAME){
			this.immediatelyHideUserBox(Constants.FULLNAME);
		}
		if (this.props.hideUserBoxesOfOtherTweets){
			this.props.hideUserBoxesOfOtherTweets(tweetId)
		}
		let userBox;
		switch(type){
			case Constants.USER_PHOTO:{
				userBox = tweetEl.getElementsByClassName("user-photo-hover")[0];
				break;}
			case Constants.USERNAME:{
				userBox = tweetEl.getElementsByClassName("username-hover")[0];
				break;}
			case Constants.FULLNAME:{
				userBox = tweetEl.getElementsByClassName("fullname-hover")[0];
				break;}
			default: break;
		}
		this.displayCountdown = setTimeout(() => {
			userBox.style.display = "block";
		} ,700)
	}
	hideUserBox(type){
		if (this.displayCountdown){
			clearTimeout(this.displayCountdown)
		}
		const tweetId = this.props.tweet['_id']
		const tweetEl = document.getElementById(tweetId);
		let userBox;
		switch(type){
			case Constants.USER_PHOTO:{
				userBox = tweetEl.getElementsByClassName("user-photo-hover")[0];
				this.clearUserBoxFromPhoto = setTimeout(()=> {
						userBox.style.display = "none";
					}, 700)
				break;}
			case Constants.USERNAME:{
				userBox = tweetEl.getElementsByClassName("username-hover")[0];
				this.clearUserBoxFromUsername = setTimeout(()=> {
					userBox.style.display = "none";
				}, 700)
				break;}
			case Constants.FULLNAME:{
				userBox = tweetEl.getElementsByClassName("fullname-hover")[0];
				this.clearUserBoxFromFullName = setTimeout(()=> {
					userBox.style.display = "none";
				}, 700)
				break;}
			default: break;
		}
	}
	immediatelyHideUserBox(type){
		const tweetEl = document.getElementById(this.props.tweet['_id']);
		let userBox;
		switch(type){
			case Constants.USER_PHOTO:{
				userBox = tweetEl.getElementsByClassName("user-photo-hover")[0];
				break;}
			case Constants.USERNAME:{
				userBox = tweetEl.getElementsByClassName("username-hover")[0];
				break;}
			case Constants.FULLNAME:{
				userBox = tweetEl.getElementsByClassName("fullname-hover")[0];
				break;}
			default: break;
		}
		userBox.style.display = "none";
	}
	stopUserBoxFromDisappearing(type){
		switch(type){
			case Constants.USER_PHOTO:{
				if (this.clearUserBoxFromPhoto){
					clearTimeout(this.clearUserBoxFromPhoto);
				}
				break;}
			case Constants.USERNAME:{
				if (this.clearUserBoxFromUsername){
					clearTimeout(this.clearUserBoxFromUsername);
				}
				break;}
			case Constants.FULLNAME:{
				if (this.clearUserBoxFromFullName){
					clearTimeout(this.clearUserBoxFromFullName);
				}
				break;}
			default: break;
		}
	}
	componentWillUnmount(){
		this.stopUserBoxFromDisappearing(Constants.USER_PHOTO);
		this.stopUserBoxFromDisappearing(Constants.USERNAME);
		this.stopUserBoxFromDisappearing(Constants.FULLNAME);
	}
	render(){
		let tweet = this.props.tweet;
		const tweetId = tweet['_id'];
		return (<div id={tweetId} className="tweet relative clearfix" key={tweetId}>
				{this.retweeter.call(this)}
				<div id="tweet-img-container" className="clearfix" onClick={this.toUser.bind(this)} 
					onMouseEnter={this.displayUserBox.bind(this, Constants.USER_PHOTO)} onMouseLeave={this.hideUserBox.bind(this, Constants.USER_PHOTO)}>
					<img id="tweet-img" src="https://pbs.twimg.com/profile_images/578979277611274241/CgGnz4F-_400x400.png"/>
				</div>
				<h3 id="tweet-authorname" onClick={this.toUser.bind(this)} onMouseEnter={this.displayUserBox.bind(this, Constants.FULLNAME)} 
				onMouseLeave={this.hideUserBox.bind(this, Constants.FULLNAME)}>{this.fullNameOfAuthor.call(this)}</h3>
				<span id="tweet-username" onClick={this.toUser.bind(this)} onMouseEnter={this.displayUserBox.bind(this, Constants.USERNAME)}
				onMouseLeave={this.hideUserBox.bind(this, Constants.USERNAME)}> {`@${tweet.authorName}`} </span>
				<span id="tweet-time">&nbsp;{tweet.tweetTime}</span>
				{this.authorRepliedTo.call(this)}
				<br/>
				<span id="tweet-content">{tweet.content}</span>
				<br/>
				{this.tweetButtons.call(this)}
				<div>
					{this.hoverBox(Constants.USER_PHOTO)}
					{this.hoverBox(Constants.USERNAME)}
					{this.hoverBox(Constants.FULLNAME)}
				</div>
		</div>)
	}
}

				//<HoverUserBox tweet={tweet} hoverOver={Constants.USERNAME}/>
				//<HoverUserBox tweet={tweet} hoverOver={Constants.FULLNAME}/>	
module.exports = Tweet;