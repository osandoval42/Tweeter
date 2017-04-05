import React from 'react';
import SessionForm from './session_form';

class SessionPopup extends React.Component{
	constructor(props) {
		super(props);
	}
	componentDidUpdate(prevProps){
		if (this.props.currentUser){
			this.props.closeSessionPopup();
		}
	}
	render(){
		return (
			<div id="session-popup-holder">
				<div id="page-blackout" onClick={this.props.closeSessionPopup}>
				</div>
				<div id="session-popup" onClick={(proxy) => {proxy.stopPropogation()}}>
					<SessionForm />
				</div>
			</div>
		)
	}
}

export default SessionPopup;