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
	followButton(oneOfUsers){ //REVISE DISABLE DOUBLE CLICK
		const currUser = this.props.currUser;
	    if (this.isFollowingUser(oneOfUsers)){
	      return (<a onClick={this.props.toggleFollow.bind(this, oneOfUsers['_id'])} className="Following">Following</a>)
	    } else {
	      return (<a onClick={this.props.toggleFollow.bind(this, oneOfUsers['_id'])} className="Follow">Follow</a>)
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
						const user = users[userId];
						const username = user.username;
						return (<li key={username}><span>{username}</span>{this.followButton(user)}</li>);
					})
				}
			</ul>
		</div>
		)
	}
}

module.exports = Follow;