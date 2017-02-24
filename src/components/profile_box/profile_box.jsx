import React from 'react';

class ProfileBox extends React.Component{
	constructor(props) {
		super(props);
	}
	render(){
		return (
			<div>
				<h1>username: {this.props.currentUser.username}</h1>
				<h3>full name</h3>
				<h5>tweets: {currentUser.tweetCount}</h5>
				<h5>followees: {currentUser.usersBeingFollowed.length}</h5>
				<h5>followers: {currentUser.usersFollowing.length}</h5>
				<a onClick={this.props.logout}> Logout</a>
			</div>
		)
	}
}

export default ProfileBox;