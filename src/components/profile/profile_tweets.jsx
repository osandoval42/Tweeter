import React from 'react';
import {browserHistory} from 'react-router';
import Constants from '../../constants/constants';
import Feed from '../feed/feed_container';


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
  render() {
    const feedType = (this.state.currDisplay === Constants.WITH_REPLIES) ? Constants.PROFILE_FEED : Constants.NON_REPLY_PROFILE_FEED;
    return (
      <div className="ProfileTweetsPanel">
        <div>
          <a onClick = {this.changeDisplay.bind(this, undefined)} className = {(!this.state.currDisplay) ? "highlighted" : ""}>Tweets</a>
          <a onClick = {this.changeDisplay.bind(this, Constants.WITH_REPLIES)} className = {(this.state.currDisplay === Constants.WITH_REPLIES) ? "highlighted" : ""}>Tweets & Replies</a>
          <Feed feedType={feedType}/>
        </div>
      </div>
    );
  }
};

export default ProfileTweets;