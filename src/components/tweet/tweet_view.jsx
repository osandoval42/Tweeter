import React from 'react';



class TweetView extends React.Component{
	constructor(props) {
		super(props);
	}
	render(){
		return (
			<div id="tweet-view-holder">
				<div id="page-blackout" onClick={this.props.closeTweetView}>
				</div>
				<div id="tweet-view" onClick={(proxy) => {proxy.stopPropogation()}}>
					<h1>{this.props.tweet.content}</h1>
				</div>
			</div>
		)
	}
}

export default TweetView;