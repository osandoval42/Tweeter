import React from 'react';
import {FOLLOWING, FOLLOWERS} from '../../constants/constants';
import {resetUsers} from '../../actions/user_actions';


class Follow extends React.Component {
	constructor(props) {
		super(props);
		this.fetchFollow();
	}
	fetchFollow(){
		const profileUser = this.props.profileUser;
		let profileUserId;
		if (profileUser){
			profileUserId = profileUser['_id'];
		}
		switch (this.props.followType){
			case FOLLOWING:{
				this.props.getUsersBeingFollowed(profileUserId);
				break;}
			case FOLLOWERS: {
				this.props.getFollowers(profileUserId);
				break;}
			default: 
				resetUsers();
			break;
		}
	}
	componentDidUpdate(prevProps){
		if (prevProps.followType != this.props.followType){
			this.fetchFollow()
		}
	}
	//add user list
	render(){
		const users = this.props.users;
		return (
		<div>
			<h3>{(this.props.followType === FOLLOWING) ? "Following" : "Followers"}</h3>
			<ul>
				{
					Object.keys(users).map((userId) => {
						const username = users[userId].username;
						return (<li key={username}>{username}</li>);
					})
				}
			</ul>
		</div>
		)
	}
}

module.exports = Follow;