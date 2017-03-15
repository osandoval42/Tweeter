import * as APIUtil from '../util/user_api_util';
import Constants from '../constants/constants';
import {receiveCurrentUser} from './session_actions'

const resetProfileUser = () => ({
	type: Constants.RESET_PROFILE_USER
})

const resetUsers = () => ({
	type: Constants.RESET_USERS
})

export const toggleFollow = (followedUserId) => dispatch => {
	APIUtil.toggleFollow(followedUserId)
		.then(currUser => {
			dispatch(receiveCurrentUser(currUser))
		}), 
		err => dispatch(receiveErrors(err.responseJSON))
};

export const clearNotifications = () => dispatch => {
	APIUtil.clearNotifications()
		.then(currUser => {
			dispatch(receiveCurrentUser(currUser))
		}), 
		err => dispatch(receiveErrors(err.responseJSON))
};

export const receiveProfileUser = profileUser => ({
	type: Constants.RECEIVE_PROFILE_USER,
	profileUser
});

export const receiveUsers = users => ({
	type: Constants.RECEIVE_USERS,
	users
});

export const fetchProfileUser = (username) => dispatch => {
	dispatch(resetProfileUser())
	APIUtil.fetchProfileUser(username)
		.then(user => dispatch(receiveProfileUser(user))), 
		err => dispatch(receiveErrors(err.responseJSON))
};


export const fetchFollowers = (followedId) => dispatch => {
	dispatch(resetUsers())
	APIUtil.fetchFollowers(followedId)
		.then(users => dispatch(receiveUsers(users))), 
		err => dispatch(receiveErrors(err.responseJSON))
};

export const fetchUsersBeingFollowed = (followerId) => dispatch => {
	dispatch(resetUsers())
	APIUtil.fetchUsersBeingFollowed(followerId)
		.then(users => dispatch(receiveUsers(users))), 
		err => dispatch(receiveErrors(err.responseJSON))
};


export const uploadProfileImg = (profileImg) => dispatch => {
	APIUtil.uploadProfileImg(profileImg)
		.then(user => dispatch(receiveProfileUser(user))), 
		err => dispatch(receiveErrors(err.responseJSON))
};

export const uploadCoverImg = (coverImg) => dispatch => {
	APIUtil.uploadCoverImg(coverImg)
		.then(user => dispatch(receiveProfileUser(user))), 
		err => dispatch(receiveErrors(err.responseJSON))
};

