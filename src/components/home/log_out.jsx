import React from 'react';

const LogOut = ({signout}) => (
	<a className="header-button logout-btn" onClick={signout}>Log Out</a>
)

module.exports = LogOut;