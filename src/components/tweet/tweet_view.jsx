import React from 'react';
import Feed from '../feed/feed_container';
import {browserHistory} from 'react-router';


class TweetView extends React.Component{
	constructor(props) {
		super(props);
		this.fetchLikePictures();
	}
	componentDidUpdate(prevProps){
		if (prevProps.tweet !== this.props.tweet ||
			prevProps.reply !== this.props.reply){
			this.fetchLikePictures()
		}
	}
	fetchLikePictures(){
		this.props.fetchTweetLikePictures(this.props.tweet);
		if (this.props.reply){
			this.props.fetchReplyLikePictures(this.props.reply);
		}
	}
	toUser(tweet){
		browserHistory.push(`/profile/${tweet.authorName}`);
	}
	fullNameOfAuthor(tweet){
		let names = []
		if (tweet.firstName) {names.push(tweet.firstName)};
		if (tweet.lastName) {names.push(tweet.lastName)};
		return names.join(" ");
	}
	followButton(tweet){ //REVISE DISABLE DOUBLE CLICK
		const oneOfUsers = {_id: tweet.authorId};
		const currUser = this.props.currUser;
	    if (this.isFollowingUser(oneOfUsers)){
	      return (<button onClick={this.toggleFollow.bind(this, oneOfUsers['_id'])} className="user-following-btn user-follow-type-btn main-tweet-follow-type-position"><span>Following</span></button>)
	    } else {
	      return (<button onClick={this.toggleFollow.bind(this, oneOfUsers['_id'])} className="user-follow-btn user-follow-type-btn main-tweet-follow-type-position"><span>Follow</span></button>)
	    }
	}
	toggleFollow(userId){
		if (this.props.currUser){
			this.props.toggleFollow(userId);
		} else {
			this.props.openSessionPopup();
		}
	}
	isFollowingUser(oneOfUsers){ //optimization opp: turn follow arrays into hashes
		const currUser = this.props.currUser;
		if (currUser){
			return (currUser.usersBeingFollowed.some((beingFollowedId) => {
				return (beingFollowedId === oneOfUsers['_id']);
			}))
		} else {
			return false;
		}
	}
	mainTweet(tweet, isTweetRepliedTo){
		const replyClassName = isTweetRepliedTo ? " reply-tweet-view" : "";
		return (
			<div className={`main-tweet${replyClassName}`}>
				<div className="maintweet-userinfo">
					<div className="maintweet-img-container" onClick={this.toUser.bind(this, tweet)}>
						<img className="main-tweet-img" src={tweet.user.profileImg}/>
					</div>
					<div className="main-tweet-names">
					<h3 className="main-tweet-authorname" onClick={this.toUser.bind(this, tweet)}>{this.fullNameOfAuthor.call(this, tweet)}</h3>
					<h4 className="tweet-username" onClick={this.toUser.bind(this, tweet)}>{`@${tweet.authorName}`}</h4>
					</div>
					{this.followButton.call(this, tweet)}
				</div>
				<br/>
				<span className="main-tweet-content">
				 {tweet.content}
				</span>
				<br/>
				<div className="main-tweet-stats">
					<div className="main-tweet-retweets-and-likes">
						<div className="main-tweet-retweets main-tweet-stat"><span>RETWEETS</span><h5>{tweet.retweets.length}</h5></div>
						<div className="main-tweet-likes main-tweet-stat"><span>LIKES</span><h5>{tweet.likes.length}</h5></div>
					</div>
					<ul className="tweet-view-pictures">
						{(isTweetRepliedTo ? this.props.replyPictures : this.props.tweetPictures).map((picObj) => {
							return (
								<div key={picObj.username} className="like-picture-container" onClick={this.toUser.bind(this, {authorName: picObj.username})}>
									<img src={picObj.profileImg}/> 
								</div>
							)
						})}
					</ul>
				</div>
				<span className="tweet-view-time">&nbsp;{tweet.tweetTime}</span>
			</div>
		)
	}
	render(){
		const tweet = this.props.tweet;
		const reply = this.props.reply;
		return (
			<div id="tweet-view-holder">
				<div id="page-blackout" onClick={this.props.closeTheTweetView}>
				</div>
				<div id="tweet-view">
					{reply ? this.mainTweet(reply, true) : undefined}
					{this.mainTweet(tweet)}
					<Feed tweetViewTweet={tweet} isReply={reply}/>
				</div>
			</div>
		)
	}
}

export default TweetView;