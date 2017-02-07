import React from 'react';

class App extends React.Component {
	constructor(props) {
    	super(props);
  	}
	render(){
		return (
			<div className = "App">
				<h1>Main app is rendering</h1>
				{this.props.children}
			</div>
		)
	}
};

module.exports = App;