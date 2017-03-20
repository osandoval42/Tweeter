import React from 'react';
import Feed from '../feed/feed_container';


class TweetView extends React.Component{
	constructor(props) {
		super(props);
	}
	render(){
		const tweet = this.props.tweet;
		return (
			<div id="tweet-view-holder">
				<div id="page-blackout" onClick={this.props.closeTheTweetView}>
				</div>
				<div id="tweet-view" onClick={(proxy) => {proxy.stopPropogation()}}>
					<h1>{tweet.content}</h1>
					<Feed tweetViewTweet={tweet}/>
				</div>
			</div>
		)
	}
}

export default TweetView;