import React from 'react';

class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = { username: "", password: "", confirmPassword: "" };
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	update(property) {
    	return (e) => this.setState({[property]: e.target.value});
  	}
  	handleSubmit(e) {
		e.preventDefault();

		const formData = {
			username: this.state.username,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword
		};
    	this.props.signup(formData);
	}
	render(){
		return (
		<div>
		<form onSubmit={this.handleSubmit} className="signup-form-box">
          <h3 className="signup-header">Sign Up</h3>
						<label>
							<input type="text"
                label='Name'
								value={this.state.username}
								onChange={this.update("username")}
								className="signup-input"
                placeholder="name" />
						</label>
				<label>
		          <input type="password"
		            value={this.state.password}
                placeholder="password"
		            onChange={this.update("password")}
								className="signup-input" />
				</label>
				<label>
		          <input type="password"
		            value={this.state.confirmPassword}
                placeholder="confirm password"
		            onChange={this.update("confirmPassword")}
								className="signup-input" />
				</label>
						<input className="signup-btn" type="submit" value="Sign Up" />
				</form>
			<a onClick={this.props.toggleSessionFormType}>login</a>
			</div>
			)
	}
}

module.exports = SignUp;