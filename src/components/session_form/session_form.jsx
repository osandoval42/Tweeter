import React from 'react';
import LogIn from './login_container';
import SignUp from './signup_container';

class SessionForm extends React.Component{
	constructor(props) {
		super(props);
		this.state = {login: true};
	}
	toggleSessionFormType(){
		this.setState({login: (!this.state.login)})
	}
	render(){
		return (
		 (this.state.login) ? <LogIn toggleSessionFormType={this.toggleSessionFormType.bind(this)}/> : <SignUp toggleSessionFormType={this.toggleSessionFormType.bind(this)}/>
		)
	}
}

export default SessionForm;