import React from 'react';
import {browserHistory} from 'react-router';

class ProfileBox extends React.Component{
	constructor(props) {
		super(props);
	}
	toProfile(subsection){
		browserHistory.push(`/profile/${this.props.currentUser.username}${subsection}`)
	}
	render(){
		const currentUser = this.props.currentUser;
		return (
			<div>
				<h1>username: {currentUser.username}</h1>
				<h3>full name</h3>
				<h5><a onClick={this.toProfile.bind(this, "")}>tweets: {currentUser.tweetCount}</a></h5>
				<h5><a onClick={this.toProfile.bind(this, "/following")}>followees: {currentUser.usersBeingFollowed.length}</a></h5>
				<h5><a onClick={this.toProfile.bind(this, "/followers")}>followers: {currentUser.usersFollowing.length}</a></h5>
				<a onClick={this.props.logout}> Logout</a>
			</div>
		)
	}
}

export default ProfileBox;