import React from 'react';
import {browserHistory} from 'react-router';
import Constants from '../../constants/constants';



class Panel extends React.Component{
  constructor(props) {
    super(props);
  }
  changeDisplay(changeTo){
    browserHistory.push(`/profile/${this.props.params.username}${changeTo}`);
  }
  isFollowingUser(){
      const profileUser = this.props.profileUser;
      const currUser = this.props.currUser;
      if (profileUser && currUser){
         return(currUser.usersBeingFollowed.some((beingFollowedId) => {
            return (profileUser['_id'] === beingFollowedId)
         }))
      } else {
        return false;
      }
  }
  followButton(){ //REVISE DISABLE DOUBLE CLICK
    const profileUser = this.props.profileUser;
    if (profileUser.username !== this.props.currUser.username){
        if (this.isFollowingUser()){
          return (<button onClick={this.props.toggleFollow.bind(this, profileUser['_id'])} id="following-btn" className="profile-follow-btn"><span>Following</span></button>)
        } else {
          return (<button onClick={this.props.toggleFollow.bind(this, profileUser['_id'])} id="follow-btn" className="profile-follow-btn">Follow</button>)
        }
    }
  }
  render() {
    const currDisplay = this.props.params.display;
    const user = this.props.profileUser.username ? this.props.profileUser : undefined
    return (
      <div id="panel">
        <div id="all-profile-panel-buttons">
          <div id="profile-panel-buttons">
            <a onClick = {this.changeDisplay.bind(this, "")}>
              <h6>TWEETS</h6>
              <span className = {(!currDisplay || currDisplay === Constants.WITH_REPLIES) ? "highlighted" : ""}>{user? user.tweetCount : undefined}</span>
              <div className = {(!currDisplay || currDisplay === Constants.WITH_REPLIES) ? "blueLine" : ""}></div>
            </a>
            <a onClick = {this.changeDisplay.bind(this, `/${Constants.FOLLOWING}`)}>
              <h6>FOLLOWING</h6> 
              <span  className = {(currDisplay === Constants.FOLLOWING) ? "highlighted" : ""}>{user ? user.usersBeingFollowed.length : undefined}</span>
              <div className = {(currDisplay === Constants.FOLLOWING) ? "blueLine" : ""}></div>
            </a>
            <a onClick = {this.changeDisplay.bind(this, `/${Constants.FOLLOWERS}`)}>
              <h6>FOLLOWERS</h6> 
              <span className = {(currDisplay === Constants.FOLLOWERS) ? "highlighted" : ""}>{user ? user.usersFollowing.length : undefined}</span>
              <div className = {(currDisplay === Constants.FOLLOWERS) ? "blueLine" : ""}></div>
            </a>
            <a onClick = {this.changeDisplay.bind(this, `/${Constants.LIKES}`)}>
              <h6>LIKES</h6> 
              <span className = {(currDisplay === Constants.LIKES) ? "highlighted" : ""}>{user ? user.likeCount : undefined}</span>
              <div className = {(currDisplay === Constants.LIKES) ? "blueLine" : ""}></div>
            </a>
          </div>
          {this.followButton()}
        </div>
      </div>
    );
  }
};

export default Panel;