import React from 'react';
import TweetingInterface from './tweeting_interface_container';



class ReplyingBox extends React.Component{
	computeInitialContent(){
		const tweet = this.props.tweetReplyingTo
		const nameStringsTweetedAt = tweet.content.split('@').slice(1)
		const namesTweetedAt = nameStringsTweetedAt.map((nameString) => {
			let idxAfterName = nameString.indexOf(" ");
			let username = (idxAfterName === -1) ? nameString : nameString.slice(0, idxAfterName);
			return `@${username}`;
		})
		const authorName = `@${tweet.authorName}`;
		if (!namesTweetedAt.some((name) => {return (name === authorName);})){
			namesTweetedAt.push(authorName);
		}
		return namesTweetedAt.join(' ');
	}
	render(){
		return (
			<div className = "PageBlackout">
			<h3>replying box</h3>
			<h4>{this.props.tweetReplyingTo.content}</h4>
				<a onClick={this.props.closeTweetingInterface}>Close Tweeting Interface</a>
				<TweetingInterface tweetReplyingTo={this.props.tweetReplyingTo} initialContent={this.computeInitialContent.call(this)}/>
			</div>
		)
	}
}

export default ReplyingBox;