import {
  RECEIVE_CURRENT_USER,
  LOGOUT,
  RECEIVE_ERRORS } from '../constants/constants';
import merge from 'lodash/merge';

const _userObj = Object.freeze({
  currentUser: null,
  errors: []
});

const SessionReducer = (state = _userObj, action) => {
  Object.freeze(state)
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      const currentUser = action.currentUser;
      const ret = {currentUser, errors: []}
      return ret;
    case LOGOUT:
      return merge({}, _userObj);
    case RECEIVE_ERRORS:
      const errors = action.errors;
      return merge({}, _userObj, {
        errors
      });
    default:
      return state;
  }
};

export default SessionReducer;