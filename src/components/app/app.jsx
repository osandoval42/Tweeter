import React from 'react';
import Navbar from '../navbar/navbar_container';
import TweetingBox from '../tweeting_interface/tweeting_box_container';
import ReplyingBox from '../tweeting_interface/replying_box_container';
import TweetView from '../tweet/tweet_view_container';
import SessionFormPopup from '../session_form/session_popup_container';

class App extends React.Component {
	constructor(props) {
    	super(props);
  	}
  	
  	tweetingInterface(){
  		const tweetingStatus = this.props.tweetingStatus;
  		if (tweetingStatus.tweetReplyingTo){
  			return <ReplyingBox tweetReplyingTo={tweetingStatus.tweetReplyingTo}/>
  		} else if (tweetingStatus.isWriting){
  			return <TweetingBox initialContent={tweetingStatus.initialContent} fullNameTo={tweetingStatus.fullNameTo}/>
  		}
  	}
    tweetView(){
      if (this.props.tweetViewTweet){
        return <TweetView />
      }
    }
    sessionFormPopup(){
      if (this.props.sessionPopupStatus){
        return <SessionFormPopup />
      }
    }
	render(){
		return (
			<div className = "App" id="app">
				<Navbar/>
        {this.sessionFormPopup()}
				{this.tweetingInterface()}
        {this.tweetView()}
				{this.props.children}
			</div>
		)
	}
};

module.exports = App;