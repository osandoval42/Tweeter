import React from 'react';
import {login} from '../../actions/session_actions';

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
			username: this.state.email,
			password: this.state.password
		};

    	this.props.signin(formData);
	}
	render() {
		return (
			<header className="login-form-container">
				<h3>Log In</h3>
				<form onSubmit={this.handleSubmit} className="login-form-box">
						<div className='input-w-label'>
							<label for="login-input"> Username 	</label>
							<input type="text"
								value={this.state.email}
								onChange={this.update("email")}
								className="login-input" id="login-input" />
						</div>

          				<div className="input-w-label">
							<label for="login-password-input"> Password 	</label>
							<input type="password"
								value={this.state.password}
								onChange={this.update("password")}
								className="login-input" id="login-password-input" />
						</div>
						  <input type="submit" value="Log In" className="login-submit" />
				</form>
			</header>
		);
	}
}

module.exports = LogInForm;