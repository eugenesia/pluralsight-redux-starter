// Some ES6 features can't be transpiled by Babel, need polyfill.
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import {loadCourses} from './actions/courseActions';
import {loadAuthors} from './actions/authorActions';
import './styles/styles.css'; // Webpack can import CSS files too!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// Instance of store.
const store = configureStore();
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

// Provider wraps entire app so it's connected to Redux store.
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
