import React from 'react';
import {browserHistory} from 'react-router';
import HoverUserBox from './hover_user_box';
import Constants from '../../constants/constants';

class Tweet extends React.Component{
	constructor(props) {
		super(props);
		this.hasHoverBoxes = false;
	}
	retweeter(){
		const retweeter = this.props.tweet.retweetAuthorName;
		return (retweeter) ? (<span className="top-of-tweet" onClick={this.toUserViaAt.bind(this, retweeter)}>{`@${retweeter} Retweeted`}</span>) : undefined;
	}
	toUser(tweet){
		browserHistory.push(`/profile/${this.props.tweet.authorName}`);
	}
	toUserViaAt(username){
		browserHistory.push(`/profile/${username}`);
	}
	toHashTag(hashtagName){
		browserHistory.push(`/hashtag/${hashtagName}`);
	}
	fullNameOfAuthor(){
		let names = []
		const tweet = this.props.tweet;
		if (tweet.firstName) {names.push(tweet.firstName)};
		if (tweet.lastName) {names.push(tweet.lastName)};
		return names.join(" ");
	}
	authorRepliedTo(){
		const tweet = this.props.tweet;
		const repliedTo = tweet.tweetRepliedTo;
		return repliedTo ? (<span className="top-of-tweet">In reply to @{repliedTo.authorName}</span>) : undefined;
	}
	getCount(type){
		const tweet = this.props.tweet;
		if (!tweet[type] || tweet[type].length < 1){
			return undefined;
		} else {
			return tweet[type].length;
		}
	}
	likeButtonClicked(tweet){
		if (this.props.currentUser){
			this.props.toggleLike(tweet['_id']);
		} else {
			this.props.openSessionPopup();
		}
	}
	likeButton(){
		const tweet = this.props.tweet;
		const currUser = this.props.currentUser
		if ((!tweet.likes) || currUser && tweet.likes.some((like) => { return (like.userId === currUser['_id'])})){
			return <a onClick={this.likeButtonClicked.bind(this, tweet)}>unlike {this.getCount("likes")}</a>
		} else {
			return <a onClick={this.likeButtonClicked.bind(this, tweet)}>like {this.getCount("likes")}</a>
		}
	}
	retweetClicked(tweetId){
		if (this.props.currentUser){
			this.props.retweet(tweetId)
		} else {
			this.props.openSessionPopup();
		}
	}
	unretweetClicked(retweetId){
		if (this.props.currentUser){
			this.props.unretweet(retweetId)
		} else {
			this.props.openSessionPopup();
		}
	}
	retweetButton(){
		const tweet = this.props.tweet;
		const tweetId = tweet['_id'];
		const currUser = this.props.currentUser
		const retweetButton = <a onClick={this.retweetClicked.bind(this, tweetId)}>retweet {this.getCount.call(this, "retweets")}</a>
		let retweetId;
		const retweets = tweet.retweets;
		if (currUser){
			if (retweets && retweets.some((retweet) => {
				const bool =(retweet.authorId === currUser['_id'])
				if (bool) {retweetId = retweet['_id']}
				return bool;
			})){
				return (<a className="unretweet-btn" onClick={this.unretweetClicked.bind(this, retweetId)}>retweet {this.getCount.call(this, "retweets")}</a>)
			} else {
				return retweetButton
			}
			//return retweetButton if has not retweeted
			//else return unretweetButton
		} else {
			return retweetButton;
		}
	}
	replyClicked(tweet){
		if (this.props.currentUser){
			this.props.openReplyingInterface(tweet)
		} else {
			this.props.openSessionPopup();
		}
	}
	tweetButtons(){
		if (this.props.isReplying){
			return undefined;
		} else {
			const tweet = this.props.tweet;
			return (
				<div className="tweet-buttons">
					<span className="tweet-inter-btn"><a onClick={this.replyClicked.bind(this, tweet)}>reply {tweet.replyCount == 0 ? "" : tweet.replyCount}</a></span>
					<span className="tweet-inter-btn">{this.retweetButton.call(this)}</span>
					<span className="tweet-inter-btn">{this.likeButton.call(this)}</span>
				</div>
			)
		}
	}
	hoverBox(type){
		const tweet = this.props.tweet;
		if (tweet.user){
			return (
					<HoverUserBox user={tweet.user} hoverOver={type} 
					stopUserBoxFromDisappearing={this.stopUserBoxFromDisappearing.bind(this, type)} 	
					immediatelyHideUserBox={this.immediatelyHideUserBox.bind(this, type)}/>
			)
		}
	}
	displayUserBox(type){
		this.stopUserBoxFromDisappearing(type);
		// const tweetId = this.props.tweet['_id']
		const tweetEl = document.getElementById(this.tweetElId);
		if (type !== Constants.USER_PHOTO){
			this.immediatelyHideUserBox(Constants.USER_PHOTO);
		}
		if (type !== Constants.USERNAME){
			this.immediatelyHideUserBox(Constants.USERNAME);
		}
		if (type !== Constants.FULLNAME){
			this.immediatelyHideUserBox(Constants.FULLNAME);
		}
		if (this.props.hideUserBoxesOfOtherTweets){
			this.props.hideUserBoxesOfOtherTweets(this.tweetElId)
		}
		let userBox;
		switch(type){
			case Constants.USER_PHOTO:{
				userBox = tweetEl.getElementsByClassName("user-photo-hover")[0];
				break;}
			case Constants.USERNAME:{
				userBox = tweetEl.getElementsByClassName("username-hover")[0];
				break;}
			case Constants.FULLNAME:{
				userBox = tweetEl.getElementsByClassName("fullname-hover")[0];
				break;}
			default: break;
		}
		this.displayCountdown = setTimeout(() => {
			userBox.style.display = "block";
		} ,700)
	}
	hideUserBox(type){
		if (this.displayCountdown){
			clearTimeout(this.displayCountdown)
		}
		// const tweetId = this.props.tweet['_id']
		const tweetEl = document.getElementById(this.tweetElId);
		let userBox;
		switch(type){
			case Constants.USER_PHOTO:{
				userBox = tweetEl.getElementsByClassName("user-photo-hover")[0];
				this.clearUserBoxFromPhoto = setTimeout(()=> {
						userBox.style.display = "none";
					}, 700)
				break;}
			case Constants.USERNAME:{
				userBox = tweetEl.getElementsByClassName("username-hover")[0];
				this.clearUserBoxFromUsername = setTimeout(()=> {
					userBox.style.display = "none";
				}, 700)
				break;}
			case Constants.FULLNAME:{
				userBox = tweetEl.getElementsByClassName("fullname-hover")[0];
				this.clearUserBoxFromFullName = setTimeout(()=> {
					userBox.style.display = "none";
				}, 700)
				break;}
			default: break;
		}
	}
	immediatelyHideUserBox(type){
		const tweetEl = document.getElementById(this.tweetElId);
		let userBox;
		switch(type){
			case Constants.USER_PHOTO:{
				userBox = tweetEl.getElementsByClassName("user-photo-hover")[0];
				break;}
			case Constants.USERNAME:{
				userBox = tweetEl.getElementsByClassName("username-hover")[0];
				break;}
			case Constants.FULLNAME:{
				userBox = tweetEl.getElementsByClassName("fullname-hover")[0];
				break;}
			default: break;
		}
		userBox.style.display = "none";
	}
	stopUserBoxFromDisappearing(type){
		switch(type){
			case Constants.USER_PHOTO:{
				if (this.clearUserBoxFromPhoto){
					clearTimeout(this.clearUserBoxFromPhoto);
				}
				break;}
			case Constants.USERNAME:{
				if (this.clearUserBoxFromUsername){
					clearTimeout(this.clearUserBoxFromUsername);
				}
				break;}
			case Constants.FULLNAME:{
				if (this.clearUserBoxFromFullName){
					clearTimeout(this.clearUserBoxFromFullName);
				}
				break;}
			default: break;
		}
	}
	componentWillUnmount(){
		if (this.hasHoverBoxes){
			this.stopUserBoxFromDisappearing(Constants.USER_PHOTO);
			this.stopUserBoxFromDisappearing(Constants.USERNAME);
			this.stopUserBoxFromDisappearing(Constants.FULLNAME);
		}
	}
	showTweetView(e){
		const target = e.target;
		if (target.className === "tweet relative clearfix" || target.className === "tweet-content" ||
			target.className === "tweet-content-fragment"){
			this.props.openTheTweetView(this.props.tweet)
		}
	}
	//pull down usernames with objectIds for tweeted at.  Anytime we find regex for match below
	//check for all tweeted ats to find out if they match (subtring of username length ~=). 
	//With array of {firstIdx, endIdx, type: atSymbol} for all tweetedAts, create
	//array of mix of these and type: non-atsymbols.  Return mapped array of spans of substrings according to this mixed
	//collection.  
	tweetContent(){
		const validTwitterNameCharRegex = /[a-zA-Z0-9_]{1,15}/
		const tweet = this.props.tweet;
		const content = tweet.content;
		const contentLength = content.length
		const tweetedAt = tweet.tweetedAt;
		const hashtags = tweet.hashtags
		let atAndHashtagIndices = []

		for (var i = 0; i < contentLength - 1; i++){
			if ((content[i] === '@') && (i === 0 || content[i - 1] === " ") &&
				content[i + 1].match(validTwitterNameCharRegex)){
				for (var j = 0; j < tweetedAt.length; j++){
					const atThisNameLength = tweetedAt[j].username.length + 1;
					const onePastLastIdx = atThisNameLength + i;
					if (tweetedAt[j].username === content.slice(i + 1, onePastLastIdx).capitalize() &&
						((onePastLastIdx >= contentLength) || (content[onePastLastIdx] === " "))){
							atAndHashtagIndices.push({firstIdx: i, onePastLastIdx: onePastLastIdx, type: Constants.AT_SYMBOL});
							break;
					}
				}
			} else {

				if ((content[i] === '#') && (i === 0 || content[i - 1] === " ") &&
					content[i + 1].match(validTwitterNameCharRegex)){
					for (var j = 0; j < hashtags.length; j++){
						const atThisNameLength = hashtags[j].length + 1;
						const onePastLastIdx = atThisNameLength + i;
						if (hashtags[j] === content.slice(i + 1, onePastLastIdx).capitalize() &&
							((onePastLastIdx >= contentLength) || (content[onePastLastIdx] === " "))){
								atAndHashtagIndices.push({firstIdx: i, onePastLastIdx: onePastLastIdx, type: Constants.HASHTAG_SYMBOL});
								break;
						}
					}
				}
			}
		}

		let allIndices = [];
		let firstIdxNotRecorded = 0;
		let len = atAndHashtagIndices.length
		for (var i = 0; i <= len; i++){
			if ((len === 0) || (!((i === len) && (atAndHashtagIndices[len - 1].onePastLastIdx === contentLength)) &&
				!((i === 0) && (atAndHashtagIndices[0].firstIdx === 0)))
			){
				let latestNonAtContent = {firstIdx: firstIdxNotRecorded, 
				type:  Constants.NON_AT_SYMBOL
				}
				latestNonAtContent.onePastLastIdx = (i !== len) ? atAndHashtagIndices[i].firstIdx : contentLength;
				allIndices.push(latestNonAtContent);
			}

			if (i !== len){
				allIndices.push(atAndHashtagIndices[i]);
				firstIdxNotRecorded = atAndHashtagIndices[i].onePastLastIdx;
			}
		}

		return allIndices.map((indexObj, i) => {
			const contentFragment = content.slice(indexObj.firstIdx, indexObj.onePastLastIdx);
			let className = "tweet-content-fragment"
			let onClick = (()=>{})
			if (indexObj.type === Constants.AT_SYMBOL){
				className = "at-symbol"
				onClick = this.toUserViaAt.bind(this, contentFragment.slice(1).capitalize());
			} 
			if (indexObj.type === Constants.HASHTAG_SYMBOL){
				className = "hashtag-symbol"
				onClick = this.toHashTag.bind(this, contentFragment.slice(1).capitalize());
			} 
			const key = tweet['_id'] + i
			return (<span className={className} key={key} onClick={onClick}>{contentFragment}</span>);
		});
	}
	render(){
		let tweet = this.props.tweet;
		this.tweetElId = tweet.retweetId ? tweet.retweetId : tweet['_id'];
		if (this.props.isForTweetView){
			this.tweetElId = "TweetView" + this.tweetElId;
		}
		const user = tweet.user;
		const profileImg = user.profileImg;
		let hoverBoxes;
		let hasHoverBoxesClass = "";
		const emptyFunction = ()=>{};
		if ((!this.props.currentUser || tweet.authorId !== this.props.currentUser['_id']) && 
			(!this.props.params || tweet.authorName !== this.props.params.username)){
			this.hasHoverBoxes = true
			hasHoverBoxesClass = " has-hover-boxes"
			hoverBoxes = 				(<div>
					{this.hoverBox(Constants.USER_PHOTO)}
					{this.hoverBox(Constants.USERNAME)}
					{this.hoverBox(Constants.FULLNAME)}
				</div>)
		}
		return (<div id={this.tweetElId} className={`tweet relative clearfix${hasHoverBoxesClass}`} key={this.tweetElId} onClick={this.showTweetView.bind(this)}>
				{this.retweeter.call(this)}
				{this.authorRepliedTo.call(this)}
				<div id="tweet-img-container" className="clearfix" onClick={this.hasHoverBoxes ? this.toUser.bind(this) : emptyFunction} 
					onMouseEnter={hoverBoxes? this.displayUserBox.bind(this, Constants.USER_PHOTO) : emptyFunction} onMouseLeave={this.hasHoverBoxes ? this.hideUserBox.bind(this, Constants.USER_PHOTO) : emptyFunction}>
					<img id="tweet-img" src={profileImg}/>
				</div>
				<h3 id="tweet-authorname" onClick={this.hasHoverBoxes ? this.toUser.bind(this) : emptyFunction} onMouseEnter={hoverBoxes? this.displayUserBox.bind(this, Constants.FULLNAME) : emptyFunction} 
				onMouseLeave={this.hasHoverBoxes ? this.hideUserBox.bind(this, Constants.FULLNAME) : emptyFunction}>{this.fullNameOfAuthor.call(this)}</h3>
				<span id="tweet-username" onClick={this.hasHoverBoxes ? this.toUser.bind(this) : emptyFunction} onMouseEnter={this.hasHoverBoxes ? this.displayUserBox.bind(this, Constants.USERNAME) : emptyFunction}
				onMouseLeave={this.hasHoverBoxes ? this.hideUserBox.bind(this, Constants.USERNAME) : emptyFunction}> {`@${tweet.authorName}`} </span>
				<span id="tweet-time">&nbsp;{tweet.tweetTime}</span>
				<br/>
				<span className="tweet-content">{this.tweetContent.call(this)}</span>
				<br/>
				{this.tweetButtons.call(this)}
				{hoverBoxes}
		</div>)
	}
}

				//<HoverUserBox tweet={tweet} hoverOver={Constants.USERNAME}/>
				//<HoverUserBox tweet={tweet} hoverOver={Constants.FULLNAME}/>	
module.exports = Tweet;