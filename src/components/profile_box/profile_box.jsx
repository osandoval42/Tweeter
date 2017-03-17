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
		const profileImg = currentUser.profileImg;
		return (
			<div id="profile-box" className="home-left-box">
				<div id="top-half-profile-box" className="relative">				
					<div id="profile-box-img-container" onClick={this.toProfile.bind(this, "")}>
						<img id="profile-box-img" src={profileImg}/>
					</div>
					<a onClick={this.props.logout}> Logout</a>
				</div>
				<div id="profile-box-separator"></div>
				<div id="bottom-half-profile-box" className="relative">
					<h3 id="profile-box-fullname" onClick={this.toProfile.bind(this, "")}>{this.fullName()}</h3>
					<span id="profile-box-username" onClick={this.toProfile.bind(this, "")}>{`@${currentUser.username}`}</span>
					<div id="profile-box-stats">
						<container className="profile-stat" onClick={this.toProfile.bind(this, "")}>
							<span className="profile-stat-label">TWEETS</span>
							<span className="profile-stat-content">{currentUser.tweetCount}</span>
						</container>
						<container className="profile-stat" onClick={this.toProfile.bind(this, "/following")}>
							<span className="profile-stat-label">FOLLOWING</span>
							<span className="profile-stat-content">{currentUser.usersBeingFollowed.length}</span>
						</container>
						<container className="profile-stat" onClick={this.toProfile.bind(this, "/followers")}>
							<span className="profile-stat-label">FOLLOWERS</span>
							<span className="profile-stat-content">{currentUser.usersFollowing.length}</span>
						</container>
					</div>
				</div>
			</div>
		)} else {
			return (<div></div>);
		}
	}
}

export default ProfileBox;