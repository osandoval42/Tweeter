import React from 'react';

class TweetingInterface extends React.Component {
	constructor(props) {
    	super(props);
    	let newTweetContent = this.props.initialContent ? this.props.initialContent : "";
    	this.state = {newTweetContent: newTweetContent}
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
	    } else {
	    	this.props.postTweet(newTweet);
	    }
    }
	render(){
		const charCount = 140 - this.state.newTweetContent.length
		let disableBtn = ""
		let overCount = ""
		let btnIsDisabled = false;
		if (charCount < 0){
			disableBtn = " disable-btn";
			overCount = " over-char-count";
			btnIsDisabled = "disabled";
		}
		return (
					   <form id = "tweeting-interface" onSubmit={this.handleSubmit.bind(this)}>				       
				            <textarea onChange={this.updateTweetContent.bind(this)}
				              id='new-post-input' placeholder="Whats happening?" value={this.state.newTweetContent}/>
				              	<div id="char-count-container">
					             	<span className={`char-count${overCount}`}>{charCount}</span>	
					             </div>			          
					            <input type='submit' disabled={btnIsDisabled} className={`submit-tweet-btn post-tweet-btn${disableBtn}`} value='Tweet'/>				             
			          </form>
		)
	}
};

module.exports = TweetingInterface;