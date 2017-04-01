import React from 'react';
import {browserHistory} from 'react-router';
import SearchBar from './search_bar';

class Navbar extends React.Component{
	constructor(props) {
		super(props);
		this.state = {showDropdown: false};
	}
	hideDropDown(){
		this.setState({showDropdown: false})
	}
	showDropDown(){
		this.setState({showDropdown: true})
	}
	toUser(){
		const currUserName = this.props.currentUser.username;
		browserHistory.push(`/profile/${currUserName}`);
		this.setState({showDropdown: false})
	}
	notificationCount(){
		const currUser = this.props.currentUser;
		if (currUser){
			const unseenNotifications = currUser.notifications.filter((notification) => 
				{return (!notification.userHasSeen)});
			if (unseenNotifications.length > 0){
				return (<span id="notification-alert" className="twitter-background-color">{unseenNotifications.length} </span>)
			}	
		}
	}
	settingsDropDownBackdrop(){
		if (this.state.showDropdown){
			return (
			<div id="dropdown-backdrop" onClick={this.hideDropDown.bind(this)}></div>)
		}
	}
	toNotificationsPage(){
		if (this.props.currentUser){
			browserHistory.push(`/notifications`);
		}
	}
	fullName(){
		const currentUser = this.props.currentUser;
		let names = []
		if (currentUser.firstName) {names.push(currentUser.firstName)};
		if (currentUser.lastName) {names.push(currentUser.lastName)};
		return names.join(" ");
	}
	settingsDropDown(){
		if (this.state.showDropdown){
			return(<ul id="dropdown">
				<li id="view-profile"><container onClick={this.toUser.bind(this)}><h4>{this.fullName.call(this)}</h4><a>View Profile</a></container></li>
				<li id="logout-btn"><container onClick={this.props.logout}><a>Logout</a></container></li>
			</ul>)
		}
	}
	myProfileImg(){
		const currUser = this.props.currentUser;
		if (currUser){
			const profileImg = currUser.profileImg
			return (
				<div id="dropdown-btn-container" style={{"maxWidth":"32px"}}>
				<div id="my-profile-img-container" onClick={this.showDropDown.bind(this)}>
					<img id="my-profile-img" src={profileImg}/>
				</div>
				{this.settingsDropDown.call(this)}
				</div>
			)
		}
	}
	toHome(){
		browserHistory.push('/')
	}
	tweetButtonClicked(){
		if (this.props.currentUser){
			this.props.openTweetingInterface();	
		} else {
			this.props.openSessionPopup();
		}
	}
	render(){
		return (
			<header className="full-width block" id="header">
				<ul id="nav-tabs">
					<a onClick={this.toHome}>Home</a>
					<a id="notifications" className="relative block" onClick={this.toNotificationsPage.bind(this)}>{this.notificationCount()}Notifications</a>
				</ul>
				<i className="fa fa-twitter twitter-font-color"></i>
				<div id="right-of-icon">
				<SearchBar/>
				{this.myProfileImg.call(this)}
				{this.settingsDropDownBackdrop.call(this)}
					<button className="post-tweet-btn" onClick={this.tweetButtonClicked.bind(this)}>Tweet</button>
				</div>
			</header>
		)
	}
}

export default Navbar;