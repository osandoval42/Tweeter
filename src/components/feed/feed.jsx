import React from 'react';

// is retweet?
// content
// authorname (semi dependent)
// retweet author (dependent)
// date time 
// picture
// likes *
// retweets 
// replies


//how do I ensure tweets in tweet_reducer is empty when getTweets fires
class Feed extends React.Component { 
	constructor(props) {
		super(props);
	}
	componentWillMount(){
		this.props.getTweets();
	}
	retweeter(tweet){
		const retweeter = tweet.retweetAuthorName;
		return (retweeter) ? (<li>Retweeted By: {retweeter}</li>) : undefined;
	}
	authorRepliedTo(tweet){
		const repliedTo = tweet.tweetRepliedTo;
		return repliedTo ? (<li>In reply to: {repliedTo.authorName}</li>) : undefined;
	}
	render(){
		const tweets = this.props.tweets;
		const originalTweetIds = Object.keys(tweets);
		return (
				<div>
					<ul>
						{   originalTweetIds.map((originalTweetId) => {
							const tweet = tweets[originalTweetId];
							const retweetCount = tweet.retweets.length;
							const likesCount = tweet.likes.length;
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