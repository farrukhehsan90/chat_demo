import { combineReducers } from 'redux';

import login from './Login';
import register from './Register';

import navigations from './Navigations';
import allUser from './allUser';

export const rootReducer = combineReducers({
  login,
  register,
  navigations,
  allUser,
});
