import React from 'react';
import Feed from '../feed/feed_container';


class TweetView extends React.Component{
	constructor(props) {
		super(props);
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
	      return (<button onClick={this.props.toggleFollow.bind(this, oneOfUsers['_id'])} className="user-following-btn user-follow-type-btn"><span>Following</span></button>)
	    } else {
	      return (<button onClick={this.props.toggleFollow.bind(this, oneOfUsers['_id'])} className="user-follow-btn user-follow-type-btn"><span>Follow</span></button>)
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
	mainTweet(tweet, isReply){
		const replyClassName = isReply ? " reply-tweet-view" : "";
		return (
			<div className={`main-tweet${isReply}`}>
				<div className="maintweet-userinfo">
					<div className="maintweet-img-container">
						<img className="main-tweet-img" src={tweet.user.profileImg}/>
					</div>
					<h3 className="main-tweet-authorname">{this.fullNameOfAuthor.call(this, tweet)}</h3>
					<h4 className="tweet-username">{`@${tweet.authorName}`}</h4>
					{this.followButton(tweet)}
				</div>
				<div className="main-tweet-stats">
					<div className="main-tweet-retweets-and-likes">
						<div className="main-tweet-retweets"><span>RETWEETS</span><h5>{tweet.retweets.length}</h5></div>
						<div className="main-tweet-likes"><span>LIKES</span><h5>{tweet.likes.length}</h5></div>
					</div>
					<div className="main-tweet-time">&nbsp;{tweet.tweetTime}</div>
				</div>
				
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
				<div id="tweet-view" onClick={(proxy) => {proxy.stopPropogation()}}>
					{reply ? this.mainTweet(reply, true) : undefined}
					{this.mainTweet(tweet)}
					<Feed tweetViewTweet={tweet}/>
				</div>
			</div>
		)
	}
}

export default TweetView;