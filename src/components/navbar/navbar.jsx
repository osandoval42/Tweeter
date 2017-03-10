import React from 'react';
import {browserHistory} from 'react-router';
import SearchBar from './search_bar';

class Navbar extends React.Component{
	constructor(props) {
		super(props);
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
	toNotificationsPage(){
		if (this.props.currentUser){
			browserHistory.push(`/notifications`);
		}
	}
	myProfileImg(){
		const currUser = this.props.currentUser;
		if (currUser){
			return (
				<div id="my-profile-img-container">
					<img id="my-profile-img" src="https://pbs.twimg.com/profile_images/578979277611274241/CgGnz4F-_400x400.png"/>
				</div>
			)
		}
	}
	toHome(){
		browserHistory.push('/')
	}
	render(){
		return (
			<header className="full-width block" id="header">
				<ul id="nav-tabs">
					<a onClick={this.toHome}>Home</a>
					<a id="notifications" className="relative block" onClick={this.toNotificationsPage.bind(this)}>{this.notificationCount()}Notifications</a>
					<a>Messages</a>
				</ul>
				<i className="fa fa-twitter twitter-font-color"></i>
				<div id="right-of-icon">
				<SearchBar/>
				{this.myProfileImg.call(this)}
					<button className="post-tweet-btn" onClick={this.props.openTweetingInterface}>Tweet</button>
				</div>
			</header>
		)
	}
}

export default Navbar;