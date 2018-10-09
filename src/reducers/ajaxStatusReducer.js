import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === '_SUCCESS';
}

export default function ajaxStatusReducer(state = initialState.ajaxCallsInProgress, action) { 
  if (action.type === types.BEGIN_AJAX_CALL) {
    // Increment number of Ajax calls being made.
    return state + 1;
  } else if (actionTypeEndsInSuccess(action.type)) {
    // Handle any action type that ends in '_SUCCESS'.
    // If action ends in success, decrement no of calls as call ended.
    return state - 1;
  }
  return state;
}
