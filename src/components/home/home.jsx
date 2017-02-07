import React from 'react';
import LoggedOutHome from './logged_out_home';
import LoggedInHome from './logged_in_home';



class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
  	if (this.props.currentUser === null){
  		return (<LoggedOutHome signin={this.props.signin} signup={this.props.signup}/>)
  	} else {
  		return (<LoggedInHome signout={this.props.signout} currentUser={this.props.currentUser}/>)
  	}
  }
}

module.exports = Home