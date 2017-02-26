import React from 'react';
import Feed from '../feed/feed_container';
import {LIKES_FEED} from '../../constants/constants';

//render feed using likes in here
const Likes = ({}) => (
	<div>
		<div><h3>Likes</h3></div>
		<Feed feedType={LIKES_FEED}/>
	</div>
)

module.exports = Likes;