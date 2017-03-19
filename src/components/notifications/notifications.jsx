import React from 'react';
import Tweet from '../tweet/tweet_container';
import FollowNotification from './follow_notification';
import WhoToFollow from '../who_to_follow/who_to_follow_container';
import SessionForm from '../session_form/session_form';

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
    const currentUser = this.props.currentUser;
    if (currentUser){
      const notifications = currentUser.notifications.slice().reverse()
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
  leftBox(){
      if (this.props.currentUser){
        return (
          <div className="who-to-follow-on-profile">
            <WhoToFollow/>
          </div>
        )
      } else {
        return (
          <div className="profile-session-container">
            <SessionForm/>
          </div>
        )
      }
  }
	render(){
		return (
      <div id="notifications-whole-page">
        {this.leftBox()}
  			<div className = "notifications">
          <h1>Notifications</h1>
          {this.displayNotifications.call(this)}
  			</div>
      </div>
		)
	}
};

module.exports = Notifications;