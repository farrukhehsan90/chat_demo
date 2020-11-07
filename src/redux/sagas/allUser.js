import {take, put, call, fork} from 'redux-saga/effects';

import ApiSauce from '../../services/apiSauce';
import {all_user_api} from '../../config/WebServices';
import * as types from '../actions/ActionTypes';

import {success, failure} from '../actions/Alluser';

import {ErrorHelper} from '../../helpers';

function callRequest(data) {
  return ApiSauce.getWithToken(all_user_api, data.access_token);
}
function* watchRequest() {
  while (true) {
    const {payload} = yield take(types.ALL_USER.REQUEST);

    try {
      const response = yield call(callRequest, payload);
      yield put(success(response));

    } catch (err) {
      yield put(failure(err));
      ErrorHelper.handleErrors(err, true);
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
