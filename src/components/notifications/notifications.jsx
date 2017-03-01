import React from 'react';

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
      return (<ul>
        {notifications.map((notification) => {
          if (notification.type === Constants.FOLLOW){
            const follower = notification.follower
            return <li key={follower['_id']}>You were followed by {follower.username}</li>
          } else if (notification.type === Constants.MENTION){
            const tweet = notification.tweet;
            return <li key={tweet['_id']}>You were mentioned by {tweet.authorName} in tweet {tweet.content}</li>
          }
        })}
      </ul>)
    } else {
      return <h3>Log in to see notifications</h3>
    }
  }
	render(){
		return (
			<div className = "Notifications">
        {this.displayNotifications.call(this)}
			</div>
		)
	}
};

module.exports = Notifications;