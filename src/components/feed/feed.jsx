import React from 'react';

class Feed extends React.Component { 
	componentWillMount(){
		this.props.getTweets();
	}
	render(){
		return (
				<div>
					<ul>
						{this.props.tweets.map((tweet) => {
							const content = (tweet.retweet) ?  tweet.retweet.content : tweet.content
							return (<li>{content}</li>);
						})}
					</ul>
				</div>
		)
	}
};

module.exports = Feed;