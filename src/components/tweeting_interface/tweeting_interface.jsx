import React from 'react';
import {browserHistory} from 'react-router';

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
	    	this.props.closeTweetingInterace();
	    } else {
	    	const isOnHomePage = (window.location.pathname === "/");
	    	this.props.postTweet(newTweet, isOnHomePage);
	    	if (this.props.closeInterfaceFromHome){
				this.props.closeInterfaceFromHome();
			}
	    		this.props.closeTweetingInterface();
	    }
    }
    componentDidMount(){
    	const tweetForm = document.getElementsByClassName("new-post-input")[0];
    	tweetForm.focus()
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
		let feedInterface = "";
		let feedSubmitTweetBtn = "";
		let feedInterfaceInput = "";
		let feedCharContainer = "";
		if (this.props.closeInterfaceFromHome){
			feedInterface = " feed-tweeting-interface";
			feedInterfaceInput = " feed-interface-input"
			feedSubmitTweetBtn = " feed-submit-tweet-btn";
			feedCharContainer = " feed-char-count-container"
		}
		return (
					   <form className = {`tweeting-interface${feedInterface}`} onSubmit={this.handleSubmit.bind(this)}>				       
				            <textarea onChange={this.updateTweetContent.bind(this)}
				              className ={`new-post-input ${feedInterfaceInput}`} placeholder="Whats happening?" value={this.state.newTweetContent}/>
				              	<div className={`char-count-container${feedCharContainer}`}>
					             	<span className={`char-count${overCount}`}>{charCount}</span>	
					             </div>			          
					            <input type='submit' disabled={btnIsDisabled} className={`submit-tweet-btn post-tweet-btn${disableBtn}${feedSubmitTweetBtn}`} value='Tweet'/>				             
			          </form>
		)
	}
};

module.exports = TweetingInterface;