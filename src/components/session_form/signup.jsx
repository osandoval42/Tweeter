import React from 'react';

class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = { username: "", firstName: "", lastName: "", password: "", confirmPassword: "" };
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	update(property) {
    	return (e) => this.setState({[property]: e.target.value});
  	}
  	handleSubmit(e) {
		e.preventDefault();

		const formData = {
			username: this.state.username.capitalize(),
			firstName: this.state.firstName.capitalize(),
			lastName: this.state.lastName.capitalize(),
			password: this.state.password,
			confirmPassword: this.state.confirmPassword
		};
    	this.props.signup(formData);
	}
	render(){
		return (
		<div id="signup-form-container" className="home-left-box session-form-container">
		<form onSubmit={this.handleSubmit} className="signup-form-box">
          <h4 className="question top-question-session-form">Join us!</h4>
							<input type="text"
								value={this.state.username}
								onChange={this.update("username")}
								className="login-input"
                placeholder="username" />
							<input type="text"           
								value={this.state.firstName}
								onChange={this.update("firstName")}
								className="login-input"
                placeholder="First name" />
											<input type="text"               
								value={this.state.lastName}
								onChange={this.update("lastName")}
								className="login-input"
                placeholder="Last name" />									
		          <input type="password"
		            value={this.state.password}
                placeholder="Password"
		            onChange={this.update("password")}
								className="login-input" />
		          <input type="password"
		            value={this.state.confirmPassword}
                placeholder="Confirm password"
		            onChange={this.update("confirmPassword")}
								className="login-input" />				
						<input type="submit" value="Sign Up" className="session-start-btn" />
				</form>
				<hr id="signup-separator"/>
			<h4 id="already-have-an-account" className="question">Already have an account?</h4>
			<button className="session-switch-btn" onClick={this.props.toggleSessionFormType}>Log In</button>
			</div>
			)
	}
}

module.exports = SignUp;