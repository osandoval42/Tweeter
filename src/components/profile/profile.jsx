import React from 'react';
import Panel from './panel_container';
import Constants from '../../constants/constants';
import ProfileTweets from './profile_tweets';
import Follow from './follow_container';
import Likes from './likes';

class Profile extends React.Component { 
	constructor(props) {
		super(props);
		const username = this.props.params.username;
		this.props.getProfileUser(username);
	}
	mainDisplay(){
		if (this.hasFetchedProfileUser()){
			const display = this.props.params.display;
			switch(this.props.params.display){
				case undefined:
				case Constants.WITH_REPLIES:
				{
					return <ProfileTweets params={this.props.params}/>
					break;}
				case Constants.FOLLOWING:
				case Constants.FOLLOWERS:{
					return <Follow followType={display}/>;
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
		const username = this.props.profileUser.username;
		const firstName = this.props.profileUser.username;
		const lastName = this.props.profileUser.lastName;
		return username ? <h3>user profile is of {username}, first: {firstName}, last: {lastName}</h3> : <h3>invalid user</h3>;
	}
	tweetToButton(){
		const username = this.props.profileUser.username;
		return username ? <a onClick={this.props.openTweetingInterface.bind(this, `@${username}`)}>tweet to {username}</a> : <a>invalid user</a>;
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
					{this.tweetToButton()}
					<Panel params={this.props.params}/>
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