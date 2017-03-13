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
	render(){
		const user = this.props.user;

		return (
		<div className="user-box">
			<div className="user-box-cover-img-container" onClick={this.toUser.bind(this)}>
				<img  src="https://pbs.twimg.com/profile_banners/25073877/1485301108/1500x500"/>
			</div>
			<div></div>
			<div className="user-box-img-container" onClick={this.toUser.bind(this)}>
				<img  src="https://pbs.twimg.com/profile_images/578979277611274241/CgGnz4F-_400x400.png"/>
			</div>
			<h4 className="userbox-fullname" onClick={this.toUser.bind(this)}>{this.fullNameOfUser.call(this)}</h4>
			<h6 className="userbox-username" onClick={this.toUser.bind(this)}>@{user.username}</h6>
			{this.followButton()}
		</div>
		)
	}
}

module.exports = User;