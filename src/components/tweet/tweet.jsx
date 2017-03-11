import React from 'react';
import {browserHistory} from 'react-router';

class Tweet extends React.Component{
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
				return (<a onClick={this.props.unretweet.bind(this, retweetId)}>unretweet {this.getCount.call(this, "retweets")}</a>)
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
					<span className="tweet-inter-btn"><a onClick={this.props.openReplyingInterface.bind(this, tweet)}>reply {this.getCount.call(this, "replies")}</a></span>
					<span className="tweet-inter-btn">{this.retweetButton.call(this)}</span>
					<span className="tweet-inter-btn">{this.likeButton.call(this)}</span>
				</div>
			)
		}
	}
	render(){
		const tweet = this.props.tweet;
		const tweetId = tweet['_id'];
		return (<div className="tweet relative clearfix" key={tweetId}>
				{this.retweeter.call(this)}
				<div id="tweet-img-container" className="clearfix" onClick={this.toUser.bind(this)}>
					<img id="tweet-img" src="https://pbs.twimg.com/profile_images/578979277611274241/CgGnz4F-_400x400.png"/>
				</div>
				<h3 id="tweet-authorname" onClick={this.toUser.bind(this)}>{this.fullNameOfAuthor.call(this)}</h3>
				<span id="tweet-username" onClick={this.toUser.bind(this)}>{`@${tweet.authorName}`}</span>
				<span id="tweet-time">&nbsp;{tweet.tweetTime}</span>
				{this.authorRepliedTo.call(this)}
				<br/>
				<span id="tweet-content">{tweet.content}</span>
				<br/>
				{this.tweetButtons.call(this)}
		</div>)
	}
}

module.exports = Tweet;