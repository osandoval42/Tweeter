import {SHOW_SESSION_POPUP, HIDE_SESSION_POPUP} from '../constants/constants';
import merge from 'lodash/merge';

const _sessionPopupState = Object.freeze({
  showSessionPopup: false
});

const ShowSessionPopupReducer = (state = _sessionPopupState, action) => {
	Object.freeze(state);
  let ret;
	switch(action.type) {
    case SHOW_SESSION_POPUP:
      ret = {showSessionPopup: true}
      return ret;
    case HIDE_SESSION_POPUP:
      ret = _sessionPopupState;
      return ret;
    default:
      return state;
  	}
}

export default ShowSessionPopupReducer;