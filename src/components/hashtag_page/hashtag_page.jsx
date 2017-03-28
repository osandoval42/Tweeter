import React from 'react';
import Feed from '../feed/feed_container'; 
import ProfileBox from '../profile_box/profile_box_container';
import SessionForm from '../session_form/session_form';
import Constants from '../../constants/constants';
import WhoToFollow from '../who_to_follow/who_to_follow_container';
import Trending from '../trending/trending_container';


//REVISE put in session starter or profile on left depending 
class HashtagPage extends React.Component {
	constructor(props) {
    	super(props);
  	}
	render(){
		const hashtagName = this.props.params.hashtagName.capitalize()
		return(
		<div id="home">
			<div className="home-left-side">
				{this.props.currentUser ? <ProfileBox/> : <SessionForm/>}
				<Trending/>
			</div>
			<div id="home-feed">
				<h1 className="hashtag-page-title">{"#" + hashtagName}</h1>
				<Feed feedType = {Constants.HASHTAG_FEED} hashtagName={hashtagName} isOnHomePage={true}/>
			</div>
			<div className="who-to-follow-on-home">
				<WhoToFollow/>
			</div>
		</div>
		)
	}
}

module.exports = HashtagPage;

