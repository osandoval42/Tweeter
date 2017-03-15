import React from 'react';

const FollowNotification = ({follower}) => {
	return (
		<div className="follow-notification">
			<h3>{`${follower.username} followed you`}</h3>
			<div className="follower-notif-profile-img-container">
		         <img src={follower.profileImg}/>		       
		    </div>
		</div>
	)
}

export default FollowNotification;