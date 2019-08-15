import {combineReducers} from 'redux';


import user from './user';
import login from './login';
import pola from './pola';
const appReducer = combineReducers({
  user,
  login,
  pola
});

export default appReducer;
