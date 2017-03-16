import React from 'react';

const FollowNotification = ({follower}) => {
	return (
		<div className="follow-notification">
			<div className="follower-notif-profile-img-container">
		         <img src={follower.profileImg}/>		       
		    </div>
		    <h3><span>{follower.fullName}</span> followed you</h3>
		</div>
	)
}

export default FollowNotification;