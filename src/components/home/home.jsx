import React from 'react';
import Feed from '../feed/feed_container'; 
import ProfileBox from '../profile_box/profile_box_container';
import SessionForm from '../session_form/session_form';


//REVISE put in session starter or profile on left depending 
const HomeToBe = ({currentUser}) => (
	<div>
		{currentUser ? <ProfileBox/> : <SessionForm/>}
		<Feed/>
	</div>
)

module.exports = HomeToBe;