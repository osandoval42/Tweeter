import React from 'react';
import Feed from '../feed/feed_container';
import {LIKES_FEED} from '../../constants/constants';

//render feed using likes in here
const Likes = ({params}) => (
      <div id="main-profile-display" className="ProfileTweetsPanel">
        <div id="profile-tweets-header">
          <div id="main-profile-display-header-btns">
            <a>Likes</a>
          </div>
        </div>
        <Feed params={params} feedType={LIKES_FEED}/>
      </div>
)

module.exports = Likes;