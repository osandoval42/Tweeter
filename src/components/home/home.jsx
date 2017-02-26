import React from 'react';
import Feed from '../feed/feed_container'; 
import ProfileBox from '../profile_box/profile_box_container';
import SessionForm from '../session_form/session_form';
import Constants from '../../constants/constants';


//REVISE put in session starter or profile on left depending 
const HomeToBe = ({currentUser}) => (
	<div>
		{currentUser ? <ProfileBox/> : <SessionForm/>}
		<Feed feedType = {Constants.CURR_USER_FEED}/>
	</div>
)

module.exports = HomeToBe;