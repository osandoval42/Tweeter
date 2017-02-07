import React from 'react';
import LogOut from './log_out';
import Temp from './temp_component';

const LoggedInHome = ({currentUser, signout}) => (
			<div>
				Welcome, you are logged in as {currentUser ? currentUser.username : ""}
				<Temp />
				<LogOut signout={signout}/>
			</div>
);

module.exports = LoggedInHome