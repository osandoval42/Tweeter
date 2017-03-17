import React from 'react';
import {browserHistory} from 'react-router';

class User extends React.Component {
	constructor(props) {
		super(props);
	}

	isFollowingUser(){ //optimization opp: turn follow arrays into hashes
		const oneOfUsers = this.props.user;
		const currUser = this.props.currUser;
		if (currUser){
			return (currUser.usersBeingFollowed.some((beingFollowedId) => {
				return (beingFollowedId === oneOfUsers['_id']);
			}))
		} else {
			return false;
		}
	}
	followButton(){ //REVISE DISABLE DOUBLE CLICK
		const oneOfUsers = this.props.user;
		const currUser = this.props.currUser;
	    if (this.isFollowingUser(oneOfUsers)){
	      return (<button onClick={this.props.toggleFollow.bind(this, oneOfUsers['_id'])} className="user-following-btn user-follow-type-btn"><span>Following</span></button>)
	    } else {
	      return (<button onClick={this.props.toggleFollow.bind(this, oneOfUsers['_id'])} className="user-follow-btn user-follow-type-btn"><span>Follow</span></button>)
	    }
	}
	fullNameOfUser(){
	  const user = this.props.user;
      let names = []
      if (user.firstName) {names.push(user.firstName)};
      if (user.lastName) {names.push(user.lastName)};
      return names.join(" ");
	}
	toUser(){
		browserHistory.push(`/profile/${this.props.user.username}`);
	}
	//add user list
	toProfile(subsection){
		browserHistory.push(`/profile/${this.props.user.username}${subsection}`)
	}
	userStats(){
		if (this.props.isHoverBox){
			const user = this.props.user;
			return (
				<div className="user-box-stats">
					<container className="profile-stat" onClick={this.toProfile.bind(this, "")}>
						<span className="profile-stat-label">TWEETS</span>
						<span className="profile-stat-content">{user.tweetCount}</span>
					</container>
					<container className="profile-stat" onClick={this.toProfile.bind(this, "/following")}>
						<span className="profile-stat-label">FOLLOWING</span>
						<span className="profile-stat-content">{user.usersBeingFollowed.length}</span>
					</container>
					<container className="profile-stat" onClick={this.toProfile.bind(this, "/followers")}>
						<span className="profile-stat-label">FOLLOWERS</span>
						<span className="profile-stat-content">{user.usersFollowing.length}</span>
					</container>
				</div>
			)
		}
	}
	render(){
		const user = this.props.user;
		const profileImg = user.profileImg;
		const coverImg = user.coverImg;
		return (
		<div className="user-box">
			<div className="user-box-cover-img-container" onClick={this.toUser.bind(this)}>
				<img src={coverImg}/>
			</div>
			<div></div>
			<div className="user-box-img-container" onClick={this.toUser.bind(this)}>
				<img src={profileImg}/>
			</div>
			<h4 className="userbox-fullname" onClick={this.toUser.bind(this)}>{this.fullNameOfUser.call(this)}</h4>
			<h6 className="userbox-username" onClick={this.toUser.bind(this)}>@{user.username}</h6>
			{this.followButton()}
			{this.userStats.call(this)}
		</div>
		)
	}
}

module.exports = User;