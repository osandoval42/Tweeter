import React from 'react';
import Navbar from '../navbar/navbar_container';
import TweetingBox from '../tweeting_interface/tweeting_box_container';
import ReplyingBox from '../tweeting_interface/replying_box_container';

class App extends React.Component {
	constructor(props) {
    	super(props);
  	}
  	
  	tweetingInterface(){
  		const tweetingStatus = this.props.tweetingStatus;
  		if (tweetingStatus.tweetReplyingTo){
  			return <ReplyingBox tweetReplyingTo={tweetingStatus.tweetReplyingTo}/>
  		} else if (tweetingStatus.isWriting){
  			return <TweetingBox initialContent={tweetingStatus.initialContent}/>
  		}
  	}
	render(){
		return (
			<div className = "App" id="app">
				<Navbar/>
				{this.tweetingInterface()}
				{this.props.children}
			</div>
		)
	}
};

module.exports = App;