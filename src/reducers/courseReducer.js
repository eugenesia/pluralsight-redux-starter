import * as types from '../actions/actionTypes';

// Start with state = [] (no courses)
export default function courseReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;

    default:
      return state;
  }
}
