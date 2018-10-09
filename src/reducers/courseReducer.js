import * as types from '../actions/actionTypes';

// Start with state = [] (no courses)
export default function courseReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_COURSE:
      return [...state,
        // Create deep copy of action.course for immutability.
        Object.assign({}, action.course)
      ];

    default:
      return state;
  }
}
