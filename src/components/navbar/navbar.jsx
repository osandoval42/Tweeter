import React from 'react';
import SearchBar from './search_bar';

class Navbar extends React.Component{
	constructor(props) {
		super(props);
	}
	render(){
		return (
			<ul>
				<li>Home</li>
				<li>Notifications</li>
				<li>Messages</li>
				<li>Twitter Icon</li>
				<SearchBar/>
				{this.props.currentUser ? <li>profile img</li> : undefined}
				<a onClick={this.props.openTweetingInterface}>Post Tweet</a>
			</ul>
		)
	}
}

export default Navbar;