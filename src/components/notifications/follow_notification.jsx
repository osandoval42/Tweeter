import React from 'react';
import {browserHistory} from 'react-router';

class FollowNotification extends React.Component {
	toUser(){
		const follower = this.props.follower;
		browserHistory.push(`/profile/${follower.username}`);
		this.setState({showDropdown: false})
	}
	render(){
		const follower = this.props.follower;
		return (
			<div className="follow-notification" onClick={this.toUser.bind(this)}>
				<div className="follower-notif-profile-img-container">
			         <img src={follower.profileImg}/>		       
			    </div>
			    <h3><span>{follower.fullName}</span> followed you</h3>
			</div>
		)
	}
}

export default FollowNotification;