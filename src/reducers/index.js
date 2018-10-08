import {combineReducers} from 'redux';
import courses from './courseReducer';

// Object passed in determines shape of state https://redux.js.org/api/combinereducers
const rootReducer = combineReducers({
  // state.courses is managed by the courseReducer
  courses
});

export default rootReducer;
