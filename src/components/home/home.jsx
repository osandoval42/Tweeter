import React from 'react';
import Feed from '../feed/feed_container'; 
import ProfileBox from '../profile_box/profile_box_container';
import SessionForm from '../session_form/session_form';
import Constants from '../../constants/constants';
import TweetingInterface from '../tweeting_interface/tweeting_interface_container';


//REVISE put in session starter or profile on left depending 
class HomeToBe extends React.Component {
	 constructor(props) {
    	super(props);
    	this.state = {writingTweet: false}
  	}
  	tweetInterface(){
  		if (this.props.currentUser){
  			if (this.state.writingTweet){
  				return <div id="home-tweet-container"><TweetingInterface closeInterfaceFromHome={(()=>{this.setState({writingTweet: false})}).bind(this)}/></div>
  			} else {
  				return (
  					<div id="home-tweet-container">
	  					<div id="whats-happening" onClick={(()=>{this.setState({writingTweet: true})}).bind(this)}>
	  						<textarea placeholder="What's happening?"/>
	  					</div>
  					</div>
  				)
  			}
  		}
  	}
	render(){
		return(
		<div id="home">
			{this.props.currentUser ? <ProfileBox/> : <SessionForm/>}
			<div id="home-feed">
				{this.tweetInterface.call(this)}
				<Feed feedType = {Constants.CURR_USER_FEED} isOnHomePage={true}/>
			</div>
		</div>
		)
	}
}

module.exports = HomeToBe;