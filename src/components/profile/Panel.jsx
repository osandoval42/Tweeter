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
    const currUser = this.props.currUser;
    if (this.isFollowingUser()){
      return (<a onClick={this.props.toggleFollow.bind(this, profileUser['_id'])} className="Following">Following</a>)
    } else {
      return (<a onClick={this.props.toggleFollow.bind(this, profileUser['_id'])} className="Follow">Follow</a>)
    }
  }
  render() {
    const currDisplay = this.props.params.display;
    const user = this.props.profileUser.username ? this.props.profileUser : undefined
    return (
      <div className="Panel">
        <div>
          <a onClick = {this.changeDisplay.bind(this, "")} className = {(!currDisplay) ? "highlighted" : ""}>Tweets {user? user.tweetCount : undefined}</a>
          <a onClick = {this.changeDisplay.bind(this, `/${Constants.FOLLOWING}`)} className = {(currDisplay === Constants.FOLLOWING) ? "highlighted" : ""}>Following {user ? user.usersBeingFollowed.length : undefined}</a>
          <a onClick = {this.changeDisplay.bind(this, `/${Constants.FOLLOWERS}`)} className = {(currDisplay === Constants.FOLLOWERS) ? "highlighted" : ""}>Followers {user ? user.usersFollowing.length : undefined}</a>
          <a onClick = {this.changeDisplay.bind(this, `/${Constants.LIKES}`)} className = {(currDisplay === Constants.LIKES) ? "highlighted" : ""}>Likes {user ? user.likeCount : undefined}</a>
        </div>
        {this.followButton()}
      </div>
    );
  }
};

export default Panel;