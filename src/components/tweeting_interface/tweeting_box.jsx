import React from 'react';
import TweetingInterface from './tweeting_interface_container';



class TweetingBox extends React.Component{
	render(){
		return (
			<div id="page-blackout" onClick={this.props.closeTweetingInterface}>
				<div id="tweeting-box" onClick={(proxy) => {proxy.stopPropogation()}}>
					<h5 id="tweeting-box-header">{this.props.fullNameTo ? `Tweet to ${this.props.fullNameTo}` : "Compose new Tweet"}</h5>
					<TweetingInterface initialContent={this.props.initialContent}/>
				</div>
			</div>
		)
	}
}

export default TweetingBox;