import React from 'react';
import {browserHistory} from 'react-router';

class ProfileBox extends React.Component{
	constructor(props) {
		super(props);
	}
	toProfile(subsection){
		browserHistory.push(`/profile/${this.props.currentUser.username}${subsection}`)
	}
	fullName(){
		const currentUser = this.props.currentUser;
		let names = []
		if (currentUser.firstName) {names.push(currentUser.firstName)};
		if (currentUser.lastName) {names.push(currentUser.lastName)};
		return names.join(" ");
	}
	render(){
		const currentUser = this.props.currentUser;
		if (currentUser){
		return (
			<div>
				<h1 onClick={this.toProfile.bind(this, "")}>username: {currentUser.username}</h1>
				<h3 onClick={this.toProfile.bind(this, "")}>full name: {this.fullName()}</h3>
				<h5><a onClick={this.toProfile.bind(this, "")}>tweets: {currentUser.tweetCount}</a></h5>
				<h5><a onClick={this.toProfile.bind(this, "/following")}>followees: {currentUser.usersBeingFollowed.length}</a></h5>
				<h5><a onClick={this.toProfile.bind(this, "/followers")}>followers: {currentUser.usersFollowing.length}</a></h5>
				<a onClick={this.props.logout}> Logout</a>
			</div>
		)} else {
			return (<div></div>);
		}
	}
}

export default ProfileBox;