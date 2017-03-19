import React from 'react';
import {browserHistory} from 'react-router';
import Constants from '../../constants/constants';
import Feed from '../feed/feed_container';
import WhoToFollow from '../who_to_follow/who_to_follow_container';
import SessionForm from '../session_form/session_form';

//add in feed calling function based on which is highlighted
//REVISE PREVENT FAULTY ROUTE VALUES
class ProfileTweets extends React.Component{
  constructor(props) {
    super(props);
    if (this.props.params.display === Constants.WITH_REPLIES){
      this.state = {currDisplay: Constants.WITH_REPLIES}
    } else {
      this.state = {currDisplay: undefined};
    }
  }
  changeDisplay(newState){
    let changeTo = ""
    if (newState === Constants.WITH_REPLIES){
      changeTo = `/${Constants.WITH_REPLIES}`
    }
    browserHistory.push(`/profile/${this.props.params.username}${changeTo}`);
    this.setState({currDisplay: newState})
  }
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
  render() {
    const feedType = (this.state.currDisplay === Constants.WITH_REPLIES) ? Constants.PROFILE_FEED : Constants.NON_REPLY_PROFILE_FEED;
    return (
      <div>
      <div id="main-profile-display">
        <div id="profile-tweets-header">
          <div id="main-profile-display-header-btns">
            <a onClick = {this.changeDisplay.bind(this, undefined)} className = {(!this.state.currDisplay) ? "highlighted" : ""}>Tweets</a>
            <a onClick = {this.changeDisplay.bind(this, Constants.WITH_REPLIES)} className = {(this.state.currDisplay === Constants.WITH_REPLIES) ? "highlighted" : ""}>Tweets & Replies</a>
          </div>
        </div>
        <Feed feedType={feedType}/>
      </div>
        {this.rightBox.call(this)}
      </div>
    );
  }
};

export default ProfileTweets;