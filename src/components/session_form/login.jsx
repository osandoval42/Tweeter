import React from 'react';

class LogInForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { username: "", password: "" };
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	update(property) {
   	 return (e) => this.setState({[property]: e.target.value});
  	}
  	handleSubmit(e) {
		e.preventDefault();

		const formData = {
			username: this.state.email.capitalize(),
			password: this.state.password
		};

    	this.props.login(formData);
	}
	render() {
		return (
			<div id="login-form-container" className="home-left-box session-form-container">
				<h4 className="question top-question-session-form">Have an account?</h4>
				<form onSubmit={this.handleSubmit} className="login-form-box">
						<div className='input-w-label'>
							<input type="text"
								placeholder="Username"
								value={this.state.email}
								onChange={this.update("email")}
								className="login-input" id="login-input" />
						</div>

          				<div className="input-w-label">
							<input type="password"
								value={this.state.password}
								onChange={this.update("password")}
								placeholder="Password"
								className="login-input" id="login-password-input" />
						</div>
						  <input type="submit" value="Log In" className="session-start-btn" />
				</form>
				<hr id="login-separator"/>
				<h4 id="new-to-twitter" className="question">New To Twitter?</h4>
				<button className="session-switch-btn" onClick={this.props.toggleSessionFormType}>Sign Up</button>
			</div>
		);
	}
}

module.exports = LogInForm;