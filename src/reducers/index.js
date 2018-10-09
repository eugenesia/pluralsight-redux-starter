import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';

// Object passed in determines shape of state https://redux.js.org/api/combinereducers
const rootReducer = combineReducers({
  // state.courses is managed by the courseReducer
  courses,
  authors
});

export default rootReducer;
