// @flow

import { ALL_USER } from "./ActionTypes";

export function request(payload) {
  return {
    payload,
    type: ALL_USER.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: ALL_USER.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: ALL_USER.FAILURE
  };
}