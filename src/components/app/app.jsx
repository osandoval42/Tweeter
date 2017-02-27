import React from 'react';
import Navbar from '../navbar/navbar_container';
import TweetingInterface from '../tweeting_interface/tweeting_interface_container';

class App extends React.Component {
	constructor(props) {
    	super(props);
  	}
  	
  	tweetingInterface(){
  		const tweetStatus = this.props.tweetingStatus;
  		if (tweetStatus.isWriting){
  			return <TweetingInterface initialContent={tweetStatus.initialContent}/>
  		}
  	}
	render(){
		return (
			<div className = "App">
				<Navbar/>
				{this.tweetingInterface()}
				{this.props.children}
			</div>
		)
	}
};

module.exports = App;