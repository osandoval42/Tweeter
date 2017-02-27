import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import LimitLessLruCache from './data_structures/limitless_lru_cache';

document.addEventListener("DOMContentLoaded", () => {
	  let store;
	
	  const preloadedState = { session: { currentUser: window.currentUser }, tweets:new LimitLessLruCache};
	  store = configureStore(preloadedState);

	  const root = document.getElementById('root');
	  ReactDOM.render(<Root store={store}/>, root);
})