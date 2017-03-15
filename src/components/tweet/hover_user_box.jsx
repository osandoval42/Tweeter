import React from 'react';
import Constants from '../../constants/constants';
import User from '../user/user_container';

class HoverUserBox extends React.Component{
	constructor(props) {
		super(props);
	}
	render(){
		let className;
		switch(this.props.hoverOver){
			case Constants.USER_PHOTO: {className = " user-photo-hover"; break;}
			case Constants.USERNAME: {className = " username-hover"; break;}
			case Constants.FULLNAME: {className = " fullname-hover"; break;}
			default: break;
		}
		const user = this.props.user;
		return (
			<div className={`user-box-container${className}`} 
			onMouseEnter ={this.props.stopUserBoxFromDisappearing} onMouseLeave={this.props.immediatelyHideUserBox}>
				<User user={user} isHoverBox={true}/>
			</div>
		)
	}
}

export default HoverUserBox;