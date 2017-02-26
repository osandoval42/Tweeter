import React from 'react';
import Panel from './Panel';
import Constants from '../../constants/constants';
import ProfileTweets from './profile_tweets';
import Following from './following_container';
import Followers from './followers_container';
import Likes from './likes';

class Profile extends React.Component { 
	constructor(props) {
		super(props);
		const username = this.props.params.username;
		this.props.getProfileUser(username);
	}
	mainDisplay(){
		if (this.hasFetchedProfileUser()){
			switch(this.props.params.display){
				case undefined:
				case Constants.WITH_REPLIES:
				{
					return <ProfileTweets params={this.props.params}/>
					break;}
				case Constants.FOLLOWING:{
					return <Following/>;
					break;}
				case Constants.FOLLOWERS:{
					return <Followers/>;
					break;}
				case Constants.LIKES: {
					return <Likes profileUser={this.props.profileUser}/>;
					break;}
				default: {
				<span>Invalid Section</span>}
			}
		}
	}
	hasFetchedProfileUser(){
		return (this.props.profileUser.username !== undefined)
	}
	username(){
		const username = this.props.profileUser.username
		return username ? <h3>user profile is of {username}</h3> : <h3>invalid user</h3>;
	}
	render(){
		
		return (
			<div>
				<div className="top">
					<h3>
						Cover Photo
					</h3>
					<h3>
						Profile Photo
					</h3>
					{this.username()}
					<Panel params={this.props.params} profileUser={this.props.profileUser}/>
					<br/>
					<br/>
					<br/>
					{this.mainDisplay()}
				</div>
			</div>
		)
	}
};

module.exports = Profile;