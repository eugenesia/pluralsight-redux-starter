import {combineReducers} from 'redux';
import courses from './courseReducer';

// Shorten for state property name e.g. state.courses.
const rootReducer = combineReducers({
  courses
});

export default rootReducer;
