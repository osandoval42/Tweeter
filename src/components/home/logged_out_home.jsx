import React from 'react';
import LogInForm from './log_in_form';
import SignUpForm from './sign_up_form';

const LoggedOutHome = ({signin, signup}) => (
			<div>
				Welcome, you are logged out
				<LogInForm signin={signin}/>
				<SignUpForm signup={signup}/>
			</div>
);

module.exports = LoggedOutHome