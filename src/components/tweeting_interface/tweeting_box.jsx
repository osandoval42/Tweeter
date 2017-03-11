import React from 'react';
import TweetingInterface from './tweeting_interface_container';



class TweetingBox extends React.Component{
	componentDidMount(){
		this.body = document.getElementsByTagName('body')[0];
		this.body.className='stop-scroll';
	}
	componentWillUnmount(){
		this.body.className='a'
	}
	render(){
		return (
			<div id="tweeting-box-holder">
				<div id="page-blackout" onClick={this.props.closeTweetingInterface}>
				</div>
				<div id="tweeting-box" onClick={(proxy) => {proxy.stopPropogation()}}>
					<h5 id="tweeting-box-header">{this.props.fullNameTo ? `Tweet to ${this.props.fullNameTo}` : "Compose new Tweet"}</h5>
					<TweetingInterface initialContent={this.props.initialContent}/>
				</div>
			</div>
		)
	}
}

export default TweetingBox;