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
	componentDidUpdate(prevProps){
		if (prevProps.params.username != this.props.params.username){
			this.props.getProfileUser(this.props.params.username);
		}
	}
	hasFetchedProfileUser(){
		return (this.props.profileUser.username !== undefined)
	}
	username(){
		const username = this.props.profileUser.username;
		return username ? <h6 id="profile-username">{`@${username}`}</h6> : <h6>invalid user</h6>;
	}
	fullNameOfUser(user){
      let names = []
      if (user.firstName) {names.push(user.firstName)};
      if (user.lastName) {names.push(user.lastName)};
      return names.join(" ");
	}
	fullName(){
		const fullName = this.fullNameOfUser.call(this, this.props.profileUser);
		return (<h3 id="profile-fullname">{fullName}</h3>);
	}
	tweetToButton(){
		const username = this.props.profileUser.username;
		const fullNameTo = this.fullNameOfUser(this.props.profileUser);
		return username ? <button id="tweet-to-btn" onClick={this.props.openTweetingInterface.bind(this, `@${username}`, fullNameTo)}>Tweet to {fullNameTo}</button> : <a>invalid user</a>;
	}
	render(){
		const user = this.props.profileUser;
		return (
			<div>
				<div className="top">
		            <div id="cover-img-container">
		              <img className="cover-img" src="https://pbs.twimg.com/profile_banners/25073877/1485301108/1500x500"/>
		            </div>
					<Panel params={this.props.params}/>
				</div>
				<div id="user-profile-img-container">
		              <img className="user-profile-img" src="https://pbs.twimg.com/profile_images/1980294624/DJT_Headshot_V2_400x400.jpg"/>
		        </div>
				<div id="user-profile-info">
					{this.fullName()}
					{this.username()}
					{this.tweetToButton()}
				</div>
					{this.mainDisplay()}
			</div>
		)
	}
};

module.exports = Profile;