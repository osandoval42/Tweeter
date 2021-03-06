import React from 'react';
import Panel from './panel_container';
import Constants from '../../constants/constants';
import ProfileTweets from './profile_tweets_container';
import Follow from './follow_container';
import Likes from './likes_container';
import Trending from '../trending/trending_container';


class Profile extends React.Component { 
	constructor(props) {
		super(props);
		this.props.resetTweets();
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
					return <Likes params={this.props.params} profileUser={this.props.profileUser}/>;
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
	tweetToButtonClicked(username, fullNameTo){
		if (this.props.currUser){
			this.props.openTweetingInterface(`@${username}`, fullNameTo);
		} else {
			this.props.openSessionPopup();
		}
	}
	tweetToButton(){
		const username = this.props.profileUser.username;
		if (!this.props.currUser || this.props.currUser.username !== username){
			const fullNameTo = this.fullNameOfUser(this.props.profileUser);
			return username ? <button id="tweet-to-btn" onClick={this.tweetToButtonClicked.bind(this, username, fullNameTo)}>Tweet to {fullNameTo}</button> : undefined;
		}
	}
	getImageFromUser(type){
		let file = document.getElementById(type === Constants.PROFILE_IMG ? "profile-img-upload-btn" : "cover-img-upload-btn").files[0];
		let reader = new FileReader();
    	reader.onloadend = () => {
    		const result = reader.result;
    		if (this.isImage(result)){
    			if (type === Constants.PROFILE_IMG){
    				let profileImg = document.getElementsByClassName("user-profile-img")[0];
    				console.log(`result is ${result}`);
    				this.props.uploadProfileImg(result);
    			} else {
    				console.log(`result is ${result}`);
   					this.props.uploadCoverImg(result);
    			}
    		} else {
    			alert("Must upload image (jpeg or png)");
    		}
    	}
    	if(file){
        	reader.readAsDataURL(file);
    	}else{
    	
    	}
	}
	isImage(result){
		const colonIndex = result.indexOf(':');
		const afterIndex = result.substr(colonIndex + 1, 5);
		return (afterIndex === "image");
	}	
	profileImgUpload(){
		const currUser = this.props.currUser;
		if (currUser && this.props.profileUser.username === currUser.username){
			return (
			<div id="profile-img-upload-container">
				<input id="profile-img-upload-btn" name="profile-img-upload-btn" className="inputfile" type="file" onChange={this.getImageFromUser.bind(this, Constants.PROFILE_IMG)}/>
				<label className="img-upload-label" htmlFor="profile-img-upload-btn"><i className="fa fa-camera photo-btn"></i></label>
			</div>
			)
		}
	}
	coverImgUpload(){
		const currUser = this.props.currUser;
		if (currUser && this.props.profileUser.username === currUser.username){
			return (
			<div id="cover-img-upload-container">
				<input id="cover-img-upload-btn" name="cover-img-upload-btn" className="inputfile" type="file" onChange={this.getImageFromUser.bind(this, Constants.COVER_IMG)}/>
				<label className="img-upload-label" htmlFor="cover-img-upload-btn"><i className="fa fa-camera photo-btn"></i></label>
			</div>
			)
		}
	}
	render(){
		const user = this.props.profileUser;
		const profileImg = user.largeProfileImg;
		const coverImg = user.largeCoverImg;
		return (
			<div>
				{this.profileImgUpload()}
				{this.coverImgUpload()}
				<div className="top">
		            <div id="cover-img-container">
		              <img className="cover-img" src={coverImg}/>
		            </div>
					<Panel params={this.props.params}/>
				</div>
				<div id="user-profile-img-container">
		              <img className="user-profile-img" src={profileImg}/>		       
		        </div>
				<div id="user-profile-info">
					{this.fullName()}
					{this.username()}
					{this.tweetToButton()}
					<div className="trending-container-on-profile">
						<Trending/>
					</div>
				</div>
					{this.mainDisplay()}
			</div>
		)
	}
};

module.exports = Profile;