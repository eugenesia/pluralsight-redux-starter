import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === '_SUCCESS';
}

export default function ajaxStatusReducer(state = initialState.ajaxCallsInProgress, action) { 
  if (action.type === types.BEGIN_AJAX_CALL) {
    // Increment number of Ajax calls being made.
    return state + 1;
  } else if (action.type === types.AJAX_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)) {
    // Handle any action type that ends in '_SUCCESS'.
    // Or when an Ajax call fails.
    // Decrement no of calls as call ended.
    return state - 1;
  }
  return state;
}
