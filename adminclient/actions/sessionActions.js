//import * as types from './actionTypes';
import sessionApi from '../api/SessionApi';
import auth from '../auth/';


export function loginSuccess() {
  return {type: 'LOGED_IN'}
}

export function loginError() {
  console.log('LOGIN_ERROR');
  return {type: 'LOGIN_ERROR',message:'Failed to login'}
}

export function loginUser(credentials) {
  return function(dispatch) {
    return sessionApi.login(credentials).then(response => {
//*
    if (response.hasOwnProperty('access_token')){
      localStorage.setItem('token', response.access_token.access_token);
      dispatch(loginSuccess());
    }else{
      dispatch(loginError());
    }
//*/
    }).catch(error => {
      console.log ('error :'+error);
    //  throw(error);
      dispatch(logginError());
    });
  };
}

export function logOutUser() {
  //auth.logOut();
  return {type:'LOGGIN_OUT' }
}
