import * as types from '../actions/actionTypes';
import initialState from './initialState';

// Start with state = [] (no courses)
export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    
    case types.CREATE_COURSE_SUCCESS:
      // Add newly created course to state.
      return [
        ...state,
        // Object.assign() to make sure we copy instead of using existing ref.
        Object.assign({}, action.course)
      ];
    
    case types.UPDATE_COURSE_SUCCESS:
      return [
        // Remove the updated course in the old state.
        ...state.filter(course => course.id !== action.course.id),
        // Add updated course with new data into state.
        Object.assign({}, action.course)
      ];

    default:
      return state;
  }
}
