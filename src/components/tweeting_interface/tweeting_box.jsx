import React from 'react';
import TweetingInterface from './tweeting_interface_container';



class TweetingBox extends React.Component{
	render(){
		return (
			<div className = "PageBlackout">
			<h3>tweeting box</h3>
				<a onClick={this.props.closeTweetingInterface}>Close Tweeting Interface</a>
				<TweetingInterface initialContent={this.props.initialContent}/>
			</div>
		)
	}
}

export default TweetingBox;