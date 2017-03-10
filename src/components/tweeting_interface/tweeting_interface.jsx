import React from 'react';

class TweetingInterface extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {newTweetContent: this.props.initialContent}
  	}
  	updateTweetContent(e){
	    e.preventDefault()
	    let val = e.target.value
	    this.setState({newTweetContent: val});
  	}
  	handleSubmit(e){
	    e.preventDefault()
	    const newTweet = this.state.newTweetContent;
	    const tweetReplyingTo = this.props.tweetReplyingTo;
	    if (tweetReplyingTo){
	    	this.props.postReply(tweetReplyingTo, newTweet)
	    }
	    this.props.postTweet(newTweet);
    }
	render(){
		return (
					   <form id = "tweeting-interface" onSubmit={this.handleSubmit.bind(this)}>				       
				            <input type='text' onChange={this.updateTweetContent.bind(this)} value={this.state.newTweetContent}
				              id='new-post-input' placeholder="Whats happening?"/>				          
				            <input type='submit' id='submit-tweet-btn' className="post-tweet-btn" value='Tweet'/>
			          </form>
		)
	}
};

module.exports = TweetingInterface;