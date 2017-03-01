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
				return (<span className="notification-alert">{unseenNotifications.length} </span>)
			}	
		}
	}
	toNotificationsPage(){
		if (this.props.currentUser){
			browserHistory.push(`/notifications`);
		}
	}
	render(){
		return (
			<ul>
				<li>Home</li>
				<a onClick={this.toNotificationsPage.bind(this)}>{this.notificationCount()}Notifications</a>
				<li>Messages</li>
				<li>Twitter Icon</li>
				<SearchBar/>
				{this.props.currentUser ? <li>profile img</li> : undefined}
				<a onClick={this.props.openTweetingInterface}>Post Tweet</a>
			</ul>
		)
	}
}

export default Navbar;