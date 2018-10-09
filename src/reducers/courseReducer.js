import * as types from '../actions/actionTypes';
import initialState from './initialState';

// Start with state = [] (no courses)
export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;

    default:
      return state;
  }
}
