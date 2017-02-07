import React from 'react';
import * as TempUtils from '../../util/temp_api_util';

class Temp extends React.Component {
	constructor(props) {
		super(props);
		this.state = { username: "", password: "", confirmPassword: "" };
	}
	toggleFollowRicky(){
		TempUtils.toggleFollowRicky();
	}
	render(){
		return (
			<a className="header-button togglerickyfollow-btn" onClick={this.toggleFollowRicky}>toggle follow ricky</a>
		)
	}
}

module.exports = Temp;