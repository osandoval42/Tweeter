import React from 'react';
import Feed from '../feed/feed_container';
import WhoToFollow from '../who_to_follow/who_to_follow_container';
import SessionForm from '../session_form/session_form';
import {LIKES_FEED} from '../../constants/constants';

//render feed using likes in here
class Likes extends React.Component{
	rightBox(){
	 if (this.props.currUser){
        return (
          <div className="who-to-follow-on-profile">
            <WhoToFollow/>
          </div>
        )
      } else {
        return (
          <div className="profile-session-container">
            <SessionForm/>
          </div>
        )
      }
	}
	render(){
		const params = this.props.params;
		return (
		  <div>
		      <div id="main-profile-display" className="ProfileTweetsPanel">
		        <div id="profile-tweets-header">
		          <div id="main-profile-display-header-btns">
		            <a>Likes</a>
		          </div>
		        </div>
		        <Feed params={params} feedType={LIKES_FEED}/>
		      </div>
		      {this.rightBox.call(this)}
	      </div>
		)
	}
}

module.exports = Likes;