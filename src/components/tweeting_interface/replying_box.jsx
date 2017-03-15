import React from 'react';
import TweetingInterface from './tweeting_interface_container';
import Tweet from '../tweet/tweet_container';



class ReplyingBox extends React.Component{
	constructor(props) {
		super(props);
	}
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
		const tweet = this.props.tweetReplyingTo;
		return (
			<div id="tweeting-box-holder">
				<div id = "page-blackout" onClick={this.props.closeTweetingInterface}>
				</div>
				<div id="tweeting-box">
					<h5 id="tweeting-box-header">Compose new Reply</h5>
					<div id="tweet-replying-to-container">
						<Tweet tweet={tweet} isReplying={true}/>
					</div>
					<TweetingInterface tweetReplyingTo={this.props.tweetReplyingTo} initialContent={this.computeInitialContent.call(this)}/>
				</div>
			</div>
		)
	}
}

export default ReplyingBox;