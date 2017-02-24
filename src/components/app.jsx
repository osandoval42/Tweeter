import React from 'react';
import Navbar from './navbar/navbar_container';

class App extends React.Component {
	constructor(props) {
    	super(props);
  	}
	render(){
		return (
			<div className = "App">
				<Navbar/>
				<h1>Main app is rendering</h1>
				{this.props.children}
			</div>
		)
	}
};

module.exports = App;