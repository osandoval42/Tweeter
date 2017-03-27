import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './app/app_container';
import Home from './home/home_container';
import Profile from './profile/profile_container';
import Notifications from './notifications/notifications_container';

String.prototype.capitalize = () => {
  return this.charAt(0).toUpperCase() + (this.slice(1).split('').map((char)=>{return char.toLowerCase();}).join(""));
}

const Root = ({store}) => {
  // const _ensureLoggedIn = (nextState, replace) => {
  //   const currentUser = store.getState().session.currentUser;
  //   if (!currentUser) {
  //     replace('/login');
  //   }
  // };

  // const _redirectIfLoggedIn = (nextState, replace) => {
  //   const currentUser = store.getState().session.currentUser;
  //   if (currentUser) {
  //     replace('/');
  //   }
  // }

return (
    <Provider store= {store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="profile/:username(/:display)" component={Profile}/>
          <Route path="notifications" component={Notifications}/>
        </Route>
      </Router>
    </Provider>
  );
};

module.exports = Root;