import React from 'react';
import {FOLLOWING, FOLLOWERS} from '../../constants/constants';
import {resetUsers} from '../../actions/user_actions';
import User from '../user/user_container';


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
			<ul id="following-feed">
				{
					Object.keys(users).map((userId) => {
						const user = users[userId];
						const username = user.username;
						return (<User key={username} user={user}/>)
					})
				}
			</ul>
		)
	}
}

module.exports = Follow;