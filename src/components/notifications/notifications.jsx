import React from 'react';
import Tweet from '../tweet/tweet_container';
import FollowNotification from './follow_notification';

const Constants = {
  FOLLOW: "FOLLOW",
  MENTION: "MENTION"
}

class Notifications extends React.Component {
	constructor(props) {
    	super(props);
      if (this.props.currentUser){
        this.props.clearNotifications();
      }
  }
  displayNotifications(){
    const currUser = this.props.currentUser;
    if (currUser){
      const notifications = currUser.notifications.slice().reverse()
      return (<ul className="notification-feed">
        {notifications.map((notification) => {
          if (notification.type === Constants.FOLLOW){
            const follower = notification.follower
            return <FollowNotification key={follower['_id']} follower={follower}/>
          } else if (notification.type === Constants.MENTION){
            const tweet = notification.tweet;
            return <Tweet key={tweet['_id']} tweet={tweet}/>
          }
        })}
      </ul>)
    } else {
      return <h3>Log in to see notifications</h3>
    }
  }
	render(){
		return (
			<div className = "notifications">
        <h1>Notifications</h1>
        {this.displayNotifications.call(this)}
			</div>
		)
	}
};

module.exports = Notifications;