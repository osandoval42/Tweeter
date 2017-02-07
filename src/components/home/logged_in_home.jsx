import React from 'react';
import LogOut from './log_out';

const LoggedInHome = ({currentUser, signout}) => (
			<div>
				Welcome, you are logged in as {currentUser ? currentUser.username : ""}
				<LogOut signout={signout}/>
			</div>
);

module.exports = LoggedInHome