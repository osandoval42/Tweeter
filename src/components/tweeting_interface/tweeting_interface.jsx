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
					   <form className = "TweetingInterface" onSubmit={this.handleSubmit.bind(this)}>
				          <div className='new-tweet-content-container'>
				            <input type='text' onChange={this.updateTweetContent.bind(this)} value={this.state.newTweetContent}
				              className='new-post-input' placeholder="Whats happening?"/>
				          </div>
				          <div className='post-tweet-btn-container'>
				            <input type='submit' className='tweet-btn' value='Tweet'/>
				          </div>
			          </form>
		)
	}
};

module.exports = TweetingInterface;