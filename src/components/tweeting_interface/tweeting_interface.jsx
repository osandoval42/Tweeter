import React from 'react';

class TweetingInterface extends React.Component {
	constructor(props) {
    	super(props);
  	}
	render(){
		return (
			<div className = "PageBlackout">
				<div className = "TweetingInterface">
					<h1>Tweeting Interface With {this.props.initialContent}</h1>
					<a onClick={this.props.closeTweetingInterface}>Close Tweeting Interface</a>
				</div>
			</div>
		)
	}
};

module.exports = TweetingInterface;