import * as APIUtil from '../util/session_api_util';
import Constants from '../constants/constants';
import {fetchAllTweets} from './tweet_actions';

export const signup = user => dispatch => (
  APIUtil.signup(user)
    .then(user => {
      dispatch(receiveCurrentUser(user))
      dispatch(fetchAllTweets(user['_id']))
    },
      err => dispatch(receiveErrors(err.responseJSON)))
);

export const login = user => dispatch => (
  APIUtil.login(user)
    .then(user => {
      dispatch(receiveCurrentUser(user))
      dispatch(fetchAllTweets(user['_id']))
    },
      err => dispatch(receiveErrors(err.responseJSON)))
);

export const logout = () => dispatch => (
  APIUtil.logout().then(user => {
    dispatch(receiveCurrentUser(null))
    dispatch(fetchAllTweets())
  })
);

export const receiveCurrentUser = currentUser => ({
  type: Constants.RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveErrors = errors => ({
  type: Constants.RECEIVE_ERRORS,
  errors
});
