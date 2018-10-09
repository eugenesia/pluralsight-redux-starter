// Configure the store before creating it.

import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

// initialState might be provided by server-side rendering.
export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    // Enhance the store with middleware.
    applyMiddleware(thunk, reduxImmutableStateInvariant())
  );
}
